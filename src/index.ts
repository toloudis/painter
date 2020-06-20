import * as dat from "dat.gui";
import { buildPaletteSync, utils } from "image-q";

import compare from "./comparator";
import { brushes, Brush } from "./brush";

const imageChoices = {
  "American Gothic":
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  "Mona Lisa":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  "Bedroom In Arles":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/2560px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
  "Persistence of Memory":
    "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1554925323/shape/mentalfloss/clocks_1.png",
  "Larry Bird":
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Larry_Bird_Lipofsky.jpg",
};

const CANVAS_SIZE = 400;

class PainterApp {
  private statsEl: HTMLParagraphElement;
  private image1: HTMLCanvasElement;
  private image2: HTMLCanvasElement;
  private imageTemp: HTMLCanvasElement;
  private srcimg: HTMLImageElement;
  private sourcePixels: ImageData;
  private similarity: number;
  private palette: Uint32Array;
  private numStrokesKept: number;
  private numStrokesTried: number;
  private gui: any;
  private guiState: {};
  private brush: Brush;
  private animationId: number;

  public constructor() {
    this.animationId = -1;
    this.gui = new dat.GUI();
    this.guiState = {
      brush: 0,
      image: imageChoices["American Gothic"],
    };
    this.brush = brushes[0];
    this.numStrokesTried = 0;
    this.numStrokesKept = 0;
    this.palette = new Uint32Array(0);
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
    // now grab the downsampled pixels and hold onto them
    this.sourcePixels = ctx.getImageData(
      0,
      0,
      this.image2.width,
      this.image2.height
    );
    // generate the palette.
    const inPointContainer = utils.PointContainer.fromUint8Array(
      this.sourcePixels.data,
      this.sourcePixels.width,
      this.sourcePixels.height
    );
    // convert
    //    this.palette = buildPaletteSync([inPointContainer]);
    const pal = buildPaletteSync([inPointContainer], {
      colorDistanceFormula: "manhattan", // optional
      paletteQuantization: "neuquant-float", // optional
      colors: 256, // optional
    });
    this.palette = pal.getPointContainer().toUint32Array();

    this.restartPainting();
  }

  private restartPainting() {
    // stop any current rendering
    cancelAnimationFrame(this.animationId);

    // clear the canvas
    const context = this.image1.getContext("2d");
    context.clearRect(0, 0, this.image1.width, this.image1.height);
    const context2 = this.imageTemp.getContext("2d");
    context2.clearRect(0, 0, this.imageTemp.width, this.imageTemp.height);

    // now we can start painting!
    this.numStrokesTried = 0;
    this.numStrokesKept = 0;
    this.similarity = Number.MAX_VALUE;

    this.iterate();
  }

  private setupGui() {
    this.gui
      .add(this.guiState, "brush", {
        Round: 0,
        Pointillist: 1,
        Boxy: 2,
        Strips: 3,
      })
      .onChange((value) => {
        this.brush = brushes[value];
      });

    this.gui.add(this.guiState, "image", imageChoices).onChange((value) => {
      cancelAnimationFrame(this.animationId);
      this.animationId = -1;
      // initiate load of new image
      this.srcimg.src = value;
    });

    this.gui.add(this, "restartPainting").name("Restart");
  }

  private brushStroke(
    cvs: HTMLCanvasElement,
    brush: Brush,
    palette: Uint32Array
  ) {
    const ctx = cvs.getContext("2d");
    brush.paint(ctx, palette);
    return ctx.getImageData(0, 0, cvs.width, cvs.height);
  }

  private iterate() {
    this.numStrokesTried += 1;
    // 1. paint a brush stroke on imageTemp
    const testimage = this.brushStroke(
      this.imageTemp,
      this.brush,
      this.palette
    );

    // 2. compare images
    const newdiff = compare(testimage, this.sourcePixels);
    //console.log(newdiff);
    // 3. if new distance is less than previous distance,
    //    keep the new image
    if (newdiff < this.similarity) {
      this.similarity = newdiff;
      // copy temp image into image1
      //grab the context from your destination canvas
      var destCtx = this.image1.getContext("2d");

      //call its drawImage() function passing it the source canvas directly
      destCtx.drawImage(this.imageTemp, 0, 0);

      this.numStrokesKept += 1;
    }
    // 4. else don't
    else {
      // copy image1 into temp image
      //grab the context from your destination canvas
      var destCtx = this.imageTemp.getContext("2d");

      //call its drawImage() function passing it the source canvas directly
      destCtx.drawImage(this.image1, 0, 0);
    }

    const TARGET = 0.1;
    if (this.similarity > TARGET) {
      // update the text readout.
      this.statsEl.innerText =
        "" +
        this.numStrokesKept +
        "/" +
        this.numStrokesTried +
        "=" +
        this.numStrokesKept / this.numStrokesTried;
      this.animationId = requestAnimationFrame(this.iterate);
    } else {
      console.log("THRESHOLD ACHIEVED!!!!!");
    }
  }
}

const mypainter = new PainterApp();
