import * as dat from "dat.gui";
import RgbQuant from "rgbquant";

import { brushes, Brush, Palette, Rectangle } from "./brush";

const imageChoices = {
  "American Gothic":
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  "Mona Lisa":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  "Bedroom In Arles":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/2560px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
  "Persistence of Memory":
    "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*aj7olHU0HikYoWwhZipTcg.jpeg",
  "The Shoemaker":
    "https://uploads6.wikiart.org/images/jacob-lawrence/the-shoemaker-1945(1).jpg",
  "Sharbat Gula":
    "https://upload.wikimedia.org/wikipedia/en/b/b4/Sharbat_Gula.jpg",
  "Larry Bird":
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Larry_Bird_Lipofsky.jpg",
};

const CANVAS_SIZE = 300;
const NO_PALETTE = [];

function clipRect(rect: Rectangle, canvas: HTMLCanvasElement): Rectangle {
  // clip bounds:
  let x = rect.x;
  let y = rect.y;
  let xx = rect.x + rect.width;
  let yy = rect.y + rect.height;
  x = Math.max(0, x);
  y = Math.max(0, y);
  xx = Math.min(canvas.width, xx);
  yy = Math.min(canvas.height, yy);
  const clippedRect = { x, y, width: xx - x, height: yy - y };
  if (clippedRect.width <= 0 || clippedRect.height <= 0) {
    console.log("empty rect!");
  }
  return clippedRect;
}

class PainterApp {
  private statsEl: HTMLParagraphElement;

  // holds the painted image
  private paintedImageCanvas: HTMLCanvasElement;
  private paintedImageCtx: CanvasRenderingContext2D;

  // holds the reference image
  private referenceImageCanvas: HTMLCanvasElement;

  // holds the painted image with next brushstroke before committing
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

  // per-pixel squared error (painted vs source), and a scratch copy for proposed strokes
  private diffBuffer = new Float32Array(0);
  private diffScratch = new Float32Array(0);
  private totalDiff = 0;

  // accumulated ms for each phase, reset every stats window
  private tPlan = 0;
  private tBeforeCompare = 0;
  private tPaint = 0;
  private tAfterCompare = 0;
  private tCommit = 0;
  private tFrameStart = 0;

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
    this.paintedImageCanvas = document.createElement("canvas");
    this.paintedImageCtx = this.paintedImageCanvas.getContext("2d", {
      willReadFrequently: true,
    })!;
    this.imageTemp = document.createElement("canvas");
    this.imageTempCtx = this.imageTemp.getContext("2d", {
      willReadFrequently: true,
    })!;
    this.referenceImageCanvas = document.createElement("canvas");
    this.statsEl = document.createElement("p");
    document.body.appendChild(this.paintedImageCanvas);
    document.body.appendChild(this.referenceImageCanvas);
    document.body.appendChild(this.statsEl);
    this.srcimg = new Image();
    //this.srcimg.crossOrigin = "Anonymous";
    this.srcimg.setAttribute("crossOrigin", "");
    this.srcimg.onload = this.start.bind(this);
    this.srcimg.crossOrigin = "";
    this.srcimg.src = imageChoices["American Gothic"];
    this.sourcePixels = this.referenceImageCanvas
      .getContext("2d")!
      .createImageData(
        this.referenceImageCanvas.width,
        this.referenceImageCanvas.height
      );
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
    this.paintedImageCanvas.style.width = ws;
    this.paintedImageCanvas.style.height = hs;
    this.paintedImageCanvas.width = tgtw;
    this.paintedImageCanvas.height = tgth;
    this.paintedImageCtx = this.paintedImageCanvas.getContext("2d", {
      willReadFrequently: true,
    })!;
    this.imageTemp.style.width = ws;
    this.imageTemp.style.height = hs;
    this.imageTemp.width = tgtw;
    this.imageTemp.height = tgth;
    this.imageTempCtx = this.imageTemp.getContext("2d", {
      willReadFrequently: true,
    })!;
    this.referenceImageCanvas.style.width = ws;
    this.referenceImageCanvas.style.height = hs;
    this.referenceImageCanvas.width = tgtw;
    this.referenceImageCanvas.height = tgth;

    const ctx = this.referenceImageCanvas.getContext("2d");
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
      this.referenceImageCanvas.width,
      this.referenceImageCanvas.height
    );
    // convert
    const self = this;
    setTimeout(() => {
      const pctx = self.referenceImageCanvas.getContext("2d");
      if (!pctx) {
        throw new Error("cannot get 2d context!");
      }
      // now grab the downsampled pixels and hold onto them
      self.sourcePixels = pctx.getImageData(
        0,
        0,
        this.referenceImageCanvas.width,
        this.referenceImageCanvas.height
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

    // Fill with white so the algorithmic state (white = max error vs dark reference)
    // matches what the user sees (transparent canvas renders as white in the browser).
    this.paintedImageCtx.globalAlpha = 1.0;
    this.paintedImageCtx.fillStyle = "#ffffff";
    this.paintedImageCtx.fillRect(0, 0, this.paintedImageCanvas.width, this.paintedImageCanvas.height);
    this.imageTempCtx.globalAlpha = 1.0;
    this.imageTempCtx.fillStyle = "#ffffff";
    this.imageTempCtx.fillRect(0, 0, this.imageTemp.width, this.imageTemp.height);

    // now we can start painting!
    this.numStrokesTried = 0;
    this.numStrokesKept = 0;
    this.similarity = Number.MAX_VALUE;
    this.tPlan = 0;
    this.tBeforeCompare = 0;
    this.tPaint = 0;
    this.tAfterCompare = 0;
    this.tCommit = 0;
    this.tFrameStart = performance.now();
    this.initDiffBuffer();

    this.play = true;
    this.iterate();
  }

  // Seeds diffBuffer with the error between a blank canvas (all 0s) and the reference.
  private initDiffBuffer() {
    const w = this.paintedImageCanvas.width;
    const h = this.paintedImageCanvas.height;
    const n = w * h;
    this.diffBuffer = new Float32Array(n);
    this.diffScratch = new Float32Array(n);
    this.totalDiff = 0;
    const src = this.sourcePixels.data;
    for (let i = 0; i < n; i++) {
      const ri = 4 * i;
      const dr = 1.0 - src[ri]     / 255;  // painted starts white (1.0)
      const dg = 1.0 - src[ri + 1] / 255;
      const db = 1.0 - src[ri + 2] / 255;
      const err = dr * dr + dg * dg + db * db;
      this.diffBuffer[i] = err;
      this.totalDiff += err;
    }
  }

  private sumRect(rect: Rectangle): number {
    const w = this.paintedImageCanvas.width;
    let sum = 0;
    for (let y = rect.y; y < rect.y + rect.height; y++) {
      for (let x = rect.x; x < rect.x + rect.width; x++) {
        sum += this.diffBuffer[y * w + x];
      }
    }
    return sum;
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

  private brushStroke(
    ctx: CanvasRenderingContext2D,
    brush: Brush,
    palette: Palette
  ) {
    ctx.globalAlpha =
      Math.random() * Math.abs(this.guiState.alpha1 - this.guiState.alpha0) +
      Math.min(this.guiState.alpha0, this.guiState.alpha1);
    const rect = brush.plan(ctx, palette);
    brush.paint(ctx, palette);
    // technically only the bounding region of the stroke needs to be returned
    // clip bounds:
    const clippedRect = clipRect(rect, ctx.canvas);
    if (clippedRect.width <= 0 || clippedRect.height <= 0) {
      console.log("empty rect!");
    }
    return {
      imageData: ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
      rect: clippedRect,
    };
    //return { imageData: ctx.getImageData(rect.x, rect.y, rect.width, rect.height), rect };
  }

  private iterate() {
    this.numStrokesTried += 1;

    let t0 = performance.now();

    // 1. get region of planned brushstroke
    const rect = this.brush.plan(
      this.imageTempCtx,
      this.guiState.usePalette ? this.palette : NO_PALETTE
    );
    const clippedRect = clipRect(rect, this.imageTemp);

    if (clippedRect.width <= 0 || clippedRect.height <= 0) {
      this.animationId = requestAnimationFrame(this.iterate);
      return;
    }

    let t1 = performance.now();
    this.tPlan += t1 - t0;

    // 2. before diff: sum pre-computed buffer — no getImageData needed
    const olddiff = this.sumRect(clippedRect);

    let t2 = performance.now();
    this.tBeforeCompare += t2 - t1;

    // 3. apply brushstroke
    this.imageTempCtx.globalAlpha =
      Math.random() * Math.abs(this.guiState.alpha1 - this.guiState.alpha0) +
      Math.min(this.guiState.alpha0, this.guiState.alpha1);
    this.brush.paint(
      this.imageTempCtx,
      this.guiState.usePalette ? this.palette : NO_PALETTE
    );

    let t3 = performance.now();
    this.tPaint += t3 - t2;

    // 4. after diff: one getImageData, then inline pixel loop writing errors to diffScratch
    const strokeImageData = this.imageTempCtx.getImageData(
      clippedRect.x,
      clippedRect.y,
      clippedRect.width,
      clippedRect.height
    );
    const canvasW = this.paintedImageCanvas.width;
    const src = this.sourcePixels.data;
    const sd = strokeImageData.data;
    let newdiff = 0;
    for (let y = 0; y < clippedRect.height; y++) {
      for (let x = 0; x < clippedRect.width; x++) {
        const si = 4 * (y * clippedRect.width + x);
        const ri = 4 * ((y + clippedRect.y) * canvasW + (x + clippedRect.x));
        const dr = sd[si]     / 255 - src[ri]     / 255;
        const dg = sd[si + 1] / 255 - src[ri + 1] / 255;
        const db = sd[si + 2] / 255 - src[ri + 2] / 255;
        const err = dr * dr + dg * dg + db * db;
        this.diffScratch[(y + clippedRect.y) * canvasW + (x + clippedRect.x)] = err;
        newdiff += err;
      }
    }

    let t4 = performance.now();
    this.tAfterCompare += t4 - t3;

    // 5. accept or reject
    if (newdiff < olddiff) {
      // commit: flush diffScratch → diffBuffer for this rect, update running total
      for (let y = clippedRect.y; y < clippedRect.y + clippedRect.height; y++) {
        for (let x = clippedRect.x; x < clippedRect.x + clippedRect.width; x++) {
          this.diffBuffer[y * canvasW + x] = this.diffScratch[y * canvasW + x];
        }
      }
      this.totalDiff += newdiff - olddiff;
      this.paintedImageCtx.putImageData(strokeImageData, clippedRect.x, clippedRect.y);
      this.numStrokesKept += 1;
    } else {
      // revert only the dirty region in the temp canvas.
      // globalAlpha must be 1.0 so this is a clean copy, not an alpha-blended partial restore.
      this.imageTempCtx.globalAlpha = 1.0;
      this.imageTempCtx.drawImage(
        this.paintedImageCanvas,
        clippedRect.x, clippedRect.y, clippedRect.width, clippedRect.height,
        clippedRect.x, clippedRect.y, clippedRect.width, clippedRect.height
      );
    }

    this.tCommit += performance.now() - t4;

    const TARGET = 0.1;
    if (this.play && this.similarity > TARGET) {
      this.updateStats();
      this.animationId = requestAnimationFrame(this.iterate);
    } else {
      console.log("Stopping");
    }
  }

  private updateStats() {
    if (this.numStrokesTried % 200 === 0) {
      this.similarity = this.totalDiff;

      const n = 200;
      const elapsedSec = (performance.now() - this.tFrameStart) / 1000;
      const strokesPerSec = (n / elapsedSec).toFixed(1);
      const fmt = (ms: number) => (ms / n).toFixed(3);

      this.statsEl.innerText = [
        `Strokes: ${this.numStrokesKept}/${this.numStrokesTried} (${(100 * this.numStrokesKept / this.numStrokesTried).toFixed(1)}% kept)`,
        `Similarity: ${this.similarity.toFixed(4)}`,
        `Throughput: ${strokesPerSec} strokes/sec`,
        `--- ms/stroke ---`,
        `  plan:           ${fmt(this.tPlan)}`,
        `  before compare: ${fmt(this.tBeforeCompare)}`,
        `  paint:          ${fmt(this.tPaint)}`,
        `  after compare:  ${fmt(this.tAfterCompare)}`,
        `  commit:         ${fmt(this.tCommit)}`,
      ].join("\n");

      // reset accumulators for the next window
      this.tPlan = 0;
      this.tBeforeCompare = 0;
      this.tPaint = 0;
      this.tAfterCompare = 0;
      this.tCommit = 0;
      this.tFrameStart = performance.now();
    }
  }
}

const mypainter = new PainterApp();
