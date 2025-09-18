import * as dat from "dat.gui";
import RgbQuant from "rgbquant";

import compare, {compareSubRegion} from "./comparator";
import { brushes, Brush, Palette } from "./brush";

const imageChoices = {
  "American Gothic":
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  "Mona Lisa":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  "Bedroom In Arles":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/2560px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
  "Persistence of Memory":
    "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1554925323/shape/mentalfloss/clocks_1.png",
  "The Shoemaker":
    "https://uploads6.wikiart.org/images/jacob-lawrence/the-shoemaker-1945(1).jpg",
  "Sharbat Gula":
    "https://upload.wikimedia.org/wikipedia/en/b/b4/Sharbat_Gula.jpg",
  "Larry Bird":
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Larry_Bird_Lipofsky.jpg",
};

const CANVAS_SIZE = 300;
const NO_PALETTE = [];

class PainterApp {
  private statsEl: HTMLParagraphElement;
  private image1: HTMLCanvasElement;
  private image2: HTMLCanvasElement;
  private imageTemp: HTMLCanvasElement;
  private imageTempCtx: CanvasRenderingContext2D;
  private srcimg: HTMLImageElement;
  private sourcePixels: ImageData;
  private similarity: number;
  private palette: Palette;
  private numStrokesKept: number;
  private numStrokesTried: number;
  private play: boolean;
  private gui: any;
  private guiState: {
    alpha0: number;
    alpha1: number;
    brush: number;
    image: string;
    usePalette: boolean;
  };
  private brush: Brush;
  private animationId: number;

  public constructor() {
    this.play = false;
    this.animationId = 0;
    this.gui = new dat.GUI();
    this.guiState = {
      brush: 0,
      image: imageChoices["American Gothic"],
      usePalette: true,
      alpha0: 1,
      alpha1: 1,
    };
    this.brush = brushes[0];
    this.numStrokesTried = 0;
    this.numStrokesKept = 0;
    this.palette = [];
    this.similarity = Number.MAX_VALUE;
    this.image1 = document.createElement("canvas");
    this.imageTemp = document.createElement("canvas");
    this.imageTempCtx = this.imageTemp.getContext('2d', { willReadFrequently: true })!;
    this.image2 = document.createElement("canvas");
    this.statsEl = document.createElement("p");
    document.body.appendChild(this.image1);
    document.body.appendChild(this.image2);
    document.body.appendChild(this.statsEl);
    this.srcimg = new Image();
    //this.srcimg.crossOrigin = "Anonymous";
    this.srcimg.setAttribute("crossOrigin", "");
    this.srcimg.onload = this.start.bind(this);
    this.srcimg.crossOrigin = "";
    this.srcimg.src = imageChoices["American Gothic"];
    this.sourcePixels = this.image2
      .getContext("2d")!
      .createImageData(this.image2.width, this.image2.height);
    this.iterate = this.iterate.bind(this);
    this.setupGui();
  }

  public start() {
    this.play = false;

    const w = this.srcimg.naturalWidth;
    const h = this.srcimg.naturalHeight;
    const a = w / h;
    let tgtw = CANVAS_SIZE;
    let tgth = CANVAS_SIZE / a;
    if (a > 1) {
      tgth = CANVAS_SIZE;
      tgtw = CANVAS_SIZE * a;
    }
    const ws = "" + tgtw + "px";
    const hs = "" + tgth + "px";
    this.image1.style.width = ws;
    this.image1.style.height = hs;
    this.image1.width = tgtw;
    this.image1.height = tgth;
    this.imageTemp.style.width = ws;
    this.imageTemp.style.height = hs;
    this.imageTemp.width = tgtw;
    this.imageTemp.height = tgth;
    this.imageTempCtx = this.imageTemp.getContext('2d', { willReadFrequently: true })!;
    this.image2.style.width = ws;
    this.image2.style.height = hs;
    this.image2.width = tgtw;
    this.image2.height = tgth;

    const ctx = this.image2.getContext("2d");
    if (!ctx) {
      throw new Error("cannot get 2d context!");
    }

    // put our reference image into the srcimg canvas
    ctx.drawImage(
      this.srcimg,
      0,
      0,
      this.srcimg.naturalWidth,
      this.srcimg.naturalHeight,
      0,
      0,
      this.image2.width,
      this.image2.height
    );
    // convert
    const self = this;
    setTimeout(() => {
      const pctx = self.image2.getContext("2d");
      if (!pctx) {
        throw new Error("cannot get 2d context!");
      }
      // now grab the downsampled pixels and hold onto them
      self.sourcePixels = pctx.getImageData(
        0,
        0,
        this.image2.width,
        this.image2.height
      );

      // options with defaults (not required)
      const opts = {
        colors: 256, // desired palette size
        method: 2, // histogram method, 2: min-population threshold within subregions; 1: global top-population
        boxSize: [64, 64], // subregion dims (if method = 2)
        boxPxls: 2, // min-population threshold (if method = 2)
        initColors: 4096, // # of top-occurring colors  to start with (if method = 1)
        minHueCols: 0, // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
        dithKern: null, // dithering kernel name, see available kernels in docs below
        dithDelta: 0, // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
        dithSerp: false, // enable serpentine pattern dithering
        palette: [], // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
        reIndex: false, // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
        useCache: true, // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
        cacheFreq: 10, // min color occurance count needed to qualify for caching
        colorDist: "euclidean", // method used to determine color distance, can also be "manhattan"
      };

      const q = new RgbQuant(opts);

      // analyze histograms
      q.sample(self.sourcePixels);

      // build palette
      self.palette = q.palette(true);

      //      self.palette = palette(self.sourcePixels.data, 256, 2);

      self.restartPainting();
    }, 0);
  }

  private restartPainting() {
    // stop any current rendering
    //clearTimeout(this.animationId);
    cancelAnimationFrame(this.animationId);
    this.animationId = 0;

    // clear the canvas
    const context = this.image1.getContext("2d");
    if (!context) {
      throw new Error("cannot get 2d context!");
    }
    context.clearRect(0, 0, this.image1.width, this.image1.height);
    this.imageTempCtx.clearRect(0, 0, this.imageTemp.width, this.imageTemp.height);

    // now we can start painting!
    this.numStrokesTried = 0;
    this.numStrokesKept = 0;
    this.similarity = Number.MAX_VALUE;

    this.play = true;
    this.iterate();
  }

  private setupGui() {
    this.gui
      .add(this.guiState, "image", imageChoices)
      .name("Image")
      .onChange((value) => {
        this.play = false;
        //clearTimeout(this.animationId);
        cancelAnimationFrame(this.animationId);
        this.animationId = 0;
        // initiate load of new image
        this.srcimg.src = value;
      });

    this.gui.add(this.guiState, "usePalette").name("Limit Palette");
    this.gui
      .add(this.guiState, "brush", {
        Round: 0,
        Pointillist: 1,
        Boxy: 2,
        Strips: 3,
      })
      .name("Brush")
      .onChange((value) => {
        this.brush = brushes[value];
      });

    this.gui.add(this.guiState, "alpha0", 0, 1).name("Opacity Min");
    this.gui.add(this.guiState, "alpha1", 0, 1).name("Opacity Max");

    this.gui.add(this, "restartPainting").name("Restart");
  }

  private brushStroke(ctx: CanvasRenderingContext2D, brush: Brush, palette: Palette) {
    ctx.globalAlpha =
      Math.random() * Math.abs(this.guiState.alpha1 - this.guiState.alpha0) +
      Math.min(this.guiState.alpha0, this.guiState.alpha1);
    const rect = brush.plan(ctx, palette);
    brush.paint(ctx, palette);
    // technically only the bounding region of the stroke needs to be returned
    // clip bounds:
    let x = rect.x;
    let y = rect.y;
    let xx = rect.x + rect.width;
    let yy = rect.y + rect.height;
    x = Math.max(0, x);
    y = Math.max(0, y);
    xx = Math.min(ctx.canvas.width, xx);
    yy = Math.min(ctx.canvas.height, yy);
    const clippedRect = { x, y, width: xx - x, height: yy - y };
    if (clippedRect.width <= 0 || clippedRect.height <= 0) {
      console.log("empty rect!");
    }
    return { imageData: ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), rect: clippedRect };
    //return { imageData: ctx.getImageData(rect.x, rect.y, rect.width, rect.height), rect };
  }

  private iterate() {
    this.numStrokesTried += 1;

    // optimize for similarity check:
    // 1. get region of planned brushstroke
    // 2. check similarity of painted image before brushstroke
    // 3. apply brushstroke
    // 4. check similarity of painted image after brushstroke
    // 5. if similarity is improved, keep the stroke, else discard it


    // 1. paint a brush stroke on imageTemp
    const testimage = this.brushStroke(
      this.imageTempCtx,
      this.brush,
      this.guiState.usePalette ? this.palette : NO_PALETTE
    );

    // 2. compare images
    const newdiff = compare(testimage.imageData, this.sourcePixels);
    // use subregion distance because the rest of the image is unchanged
    // const newdiff = compareSubRegion(
    //   testimage.imageData,
    //   this.sourcePixels,
    //   testimage.rect
    // );
    //console.log(newdiff);

    // 3. if new distance is less than previous distance,
    //    keep the new image
    if (newdiff < this.similarity) {
      this.similarity = newdiff;
      // copy temp image into image1
      const destCtx = this.image1.getContext("2d")!;
      destCtx.globalCompositeOperation = "copy";
      destCtx.drawImage(this.imageTemp, 0, 0);
      //      destCtx.globalCompositeOperation = "source-over";

      this.numStrokesKept += 1;
    }
    // 4. else don't
    else {
      // copy image1 into temp image
      //destCtx.globalCompositeOperation = "copy";
      this.imageTempCtx.drawImage(this.image1, 0, 0);
      //      destCtx.globalCompositeOperation = "source-over";
    }

    const TARGET = 0.1;
    if (this.play && this.similarity > TARGET) {
      this.updateStats();
      this.animationId = requestAnimationFrame(this.iterate);
    }
    else {
      console.log("Stopping");
    }
  }

  private updateStats() {
    if (this.numStrokesTried % 100 === 0) {
      // update the text readout.
      this.statsEl.innerText =
        "Brushstrokes: " +
        this.numStrokesKept +
        "/" +
        this.numStrokesTried +
        "=" +
        this.numStrokesKept / this.numStrokesTried +
        "\nSimilarity: " +
        this.similarity;
    }
  }
}

const mypainter = new PainterApp();
