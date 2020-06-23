import * as dat from "dat.gui";
import palette from "get-rgba-palette";

import compare from "./comparator";
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
      .getContext("2d")
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
    this.image2.style.width = ws;
    this.image2.style.height = hs;
    this.image2.width = tgtw;
    this.image2.height = tgth;

    const ctx = this.image2.getContext("2d");

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
      // now grab the downsampled pixels and hold onto them
      self.sourcePixels = pctx.getImageData(
        0,
        0,
        this.image2.width,
        this.image2.height
      );

      self.palette = palette(self.sourcePixels.data, 256, 2);

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
    context.clearRect(0, 0, this.image1.width, this.image1.height);
    const context2 = this.imageTemp.getContext("2d");
    context2.clearRect(0, 0, this.imageTemp.width, this.imageTemp.height);

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

  private brushStroke(cvs: HTMLCanvasElement, brush: Brush, palette: Palette) {
    const ctx = cvs.getContext("2d");
    ctx.globalAlpha =
      Math.random() * Math.abs(this.guiState.alpha1 - this.guiState.alpha0) +
      Math.min(this.guiState.alpha0, this.guiState.alpha1);
    brush.paint(ctx, palette);
    return ctx.getImageData(0, 0, cvs.width, cvs.height);
  }

  private iterate() {
    this.numStrokesTried += 1;
    // 1. paint a brush stroke on imageTemp
    const testimage = this.brushStroke(
      this.imageTemp,
      this.brush,
      this.guiState.usePalette ? this.palette : NO_PALETTE
    );

    // 2. compare images
    const newdiff = compare(testimage, this.sourcePixels);
    //console.log(newdiff);

    // 3. if new distance is less than previous distance,
    //    keep the new image
    if (newdiff < this.similarity) {
      this.similarity = newdiff;
      // copy temp image into image1
      var destCtx = this.image1.getContext("2d");
      destCtx.globalCompositeOperation = "copy";
      destCtx.drawImage(this.imageTemp, 0, 0);
      //      destCtx.globalCompositeOperation = "source-over";

      this.numStrokesKept += 1;
    }
    // 4. else don't
    else {
      // copy image1 into temp image
      var destCtx = this.imageTemp.getContext("2d");
      //destCtx.globalCompositeOperation = "copy";
      destCtx.drawImage(this.image1, 0, 0);
      //      destCtx.globalCompositeOperation = "source-over";
    }

    const TARGET = 0.1;
    if (this.play && this.similarity > TARGET) {
      this.updateStats();
      this.animationId = requestAnimationFrame(this.iterate);
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
