import { buildPaletteSync, utils } from "image-q";

import compare from "./comparator";
import brush from "./brush";

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

  public constructor() {
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
    this.srcimg.src =
      "https://upload.wikimedia.org/wikipedia/commons/7/71/Grant_DeVolson_Wood_-_American_Gothic.jpg";
    this.sourcePixels = this.image2
      .getContext("2d")
      .createImageData(this.image2.width, this.image2.height);
    this.iterate = this.iterate.bind(this);
  }

  public start() {
    const w = this.srcimg.naturalWidth;
    const h = this.srcimg.naturalHeight;
    const a = w / h;
    const tgtw = 200;
    const tgth = 200 / a;
    const ws = "" + tgtw + "px";
    const hs = "" + tgth + "px";
    this.image1.style.width = ws;
    this.image1.style.height = hs;
    this.imageTemp.style.width = ws;
    this.imageTemp.style.height = hs;
    this.image2.style.width = ws;
    this.image2.style.height = hs;

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
      colorDistanceFormula: "euclidean", // optional
      paletteQuantization: "neuquant", // optional
      colors: 256, // optional
    });
    this.palette = pal.getPointContainer().toUint32Array();

    // now we can start painting!
    this.iterate();
  }

  private iterate() {
    this.numStrokesTried += 1;
    // 1. paint a brush stroke on imageTemp
    const testimage = brush(this.imageTemp, this.palette);

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
      requestAnimationFrame(this.iterate);
    } else {
      console.log("THRESHOLD ACHIEVED!!!!!");
    }
  }
}

const mypainter = new PainterApp();
