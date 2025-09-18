
type Palette = number[][];

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Brush {
  plan(ctx: CanvasRenderingContext2D, palette:Palette): Rectangle;
  paint(ctx: CanvasRenderingContext2D, palette: Palette): void;
}

function getRandomColor(palette: Palette) {
  if (palette.length > 0) {
    const num = palette[Math.floor(Math.random() * palette.length)];
    return `rgb(${num[0]},${num[1]},${num[2]})`;
    //console.log(num.toString(16));
    // let str = num.toString(16);
    // // abgr --> rgb
    // str = str.substr(6, 2) + str.substr(4, 2) + str.substr(2, 2);
    // return "#" + str;
  } else {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

// compute bounding box of rotated ellipse with center at x,y, radii rx,ry, and rotation rot radians:
function rotatedEllipseBoundingBox(
  x: number,
  y: number,
  rx: number,
  ry: number,
  rot: number
): Rectangle {
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const bx = Math.sqrt(rx * rx * cos * cos + ry * ry * sin * sin);
  const by = Math.sqrt(rx * rx * sin * sin + ry * ry * cos * cos);
  const bbox = { x: Math.floor(x - bx), y: Math.floor(y - by), width: Math.ceil(2 * bx), height: Math.ceil(2 * by) };
  return bbox;
}

class Pointillist implements Brush {
  private x=0;
  private y=0
  private rx=0;
  private ry=0;
  private rot=0;
  private color="";
  plan(ctx: CanvasRenderingContext2D, palette: Palette): Rectangle {
    this.x = Math.round(Math.random() * ctx.canvas.width);
    this.y = Math.round(Math.random() * ctx.canvas.height);
    this.rx = Math.ceil(Math.random() * ctx.canvas.width * 0.03125);
    this.ry = this.rx;
    this.rot = 0;
    this.color = getRandomColor(palette);
    return rotatedEllipseBoundingBox(this.x, this.y, this.rx, this.ry, this.rot);
  }

  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = this.color;
    //ctx.globalAlpha = 0.4 + Math.random() * 0.6;

    const x = Math.round(Math.random() * ctx.canvas.width);
    const y = Math.round(Math.random() * ctx.canvas.height);
    const rx = Math.ceil(Math.random() * ctx.canvas.width * 0.03125);
    const ry = rx;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Round implements Brush {
  private x=0;
  private y=0
  private rx=0;
  private ry=0;
  private rot=0;
  private color="";
  plan(ctx: CanvasRenderingContext2D, palette: Palette): Rectangle {
    this.x = Math.round(Math.random() * ctx.canvas.width);
    this.y = Math.round(Math.random() * ctx.canvas.height);
    this.rx = Math.ceil(Math.random() * ctx.canvas.width * 0.125);
    this.ry = Math.ceil(Math.random() * ctx.canvas.height * 0.125);
    this.rot = Math.random() * Math.PI;
    this.color = getRandomColor(palette);
    return rotatedEllipseBoundingBox(this.x, this.y, this.rx, this.ry, this.rot);
  }
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = this.color;
    //ctx.globalAlpha = 0.4 + Math.random() * 0.6;

    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rx, this.ry, this.rot, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Box implements Brush {
  private x=0;
  private y=0;
  private rx=0;
  private ry=0;
  private color="";
  plan(ctx: CanvasRenderingContext2D, palette: Palette): Rectangle {
    this.x = Math.round(Math.random() * ctx.canvas.width);
    this.y = Math.round(Math.random() * ctx.canvas.height);
    this.rx = Math.ceil(Math.random() * ctx.canvas.width * 0.25);
    this.ry = Math.ceil(Math.random() * ctx.canvas.height * 0.25);
    this.color = getRandomColor(palette);
    return { x: this.x, y: this.y, width: this.rx, height: this.ry };
  }
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.rx, this.ry);
  }
}

class SmallRound implements Brush {
  private x=0;
  private y=0
  private rx=0;
  private ry=0;
  private rot=0;
  private color="";
  plan(ctx: CanvasRenderingContext2D, palette: Palette): Rectangle {
    this.x = Math.round(Math.random() * ctx.canvas.width);
    this.y = Math.round(Math.random() * ctx.canvas.height);
    this.rx = Math.ceil(ctx.canvas.width * 0.025);
    this.ry = Math.ceil(Math.random() * ctx.canvas.height * 0.25);
    this.rot = Math.random() * Math.PI;
    this.color = getRandomColor(palette);
    return rotatedEllipseBoundingBox(this.x, this.y, this.rx, this.ry, this.rot);
  }
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rx, this.ry, this.rot, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class BoxStrips implements Brush {
  private x=0;
  private y=0;
  private rx=0;
  private ry=0;
  private color="";
  plan(ctx: CanvasRenderingContext2D, palette: Palette): Rectangle {
    this.x = Math.round(Math.random() * ctx.canvas.width);
    this.y = Math.round(Math.random() * ctx.canvas.height);
    this.rx = 0;
    this.ry = 0;
    if (Math.random() > 0.49999999) {
      this.rx = Math.ceil(ctx.canvas.width * 0.025);
      this.ry = Math.ceil(Math.random() * ctx.canvas.height * 0.25);
    } else {
      this.ry = Math.ceil(ctx.canvas.height * 0.025);
      this.rx = Math.ceil(Math.random() * ctx.canvas.width * 0.25);
    }
    this.color = getRandomColor(palette);
    return { x: this.x, y: this.y, width: this.rx, height: this.ry };
  }
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.rx, this.ry);
  }
}

const brushes: Brush[] = [
  new Round(),
  new Pointillist(),
  new Box(),
  new BoxStrips(),
];
export { brushes };
export { Brush };
export { Palette };
