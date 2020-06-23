
type Palette = number[][];

interface Brush {
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

class Pointillist implements Brush {
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = getRandomColor(palette);
    //ctx.globalAlpha = 0.4 + Math.random() * 0.6;

    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    const rx = Math.random() * ctx.canvas.width * 0.03125;
    const ry = rx;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Round implements Brush {
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = getRandomColor(palette);
    //ctx.globalAlpha = 0.4 + Math.random() * 0.6;

    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    const rx = Math.random() * ctx.canvas.width * 0.125;
    const ry = Math.random() * ctx.canvas.height * 0.125;
    const rot = Math.random() * Math.PI;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Box implements Brush {
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = getRandomColor(palette);
    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    const rx = Math.random() * ctx.canvas.width * 0.25;
    const ry = Math.random() * ctx.canvas.height * 0.25;
    ctx.beginPath();
    ctx.fillRect(x, y, rx, ry);
  }
}

class SmallRound implements Brush {
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = getRandomColor(palette);

    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    const rx = ctx.canvas.width * 0.025;
    const ry = Math.random() * ctx.canvas.height * 0.25;
    const rot = Math.random() * Math.PI;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class BoxStrips implements Brush {
  paint(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.fillStyle = getRandomColor(palette);

    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    let rx = 0;
    let ry = 0;
    if (Math.random() > 0.49999999) {
      rx = ctx.canvas.width * 0.025;
      ry = Math.random() * ctx.canvas.height * 0.25;
    } else {
      ry = ctx.canvas.height * 0.025;
      rx = Math.random() * ctx.canvas.width * 0.25;
    }
    ctx.beginPath();
    ctx.fillRect(x, y, rx, ry);
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
