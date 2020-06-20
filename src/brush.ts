function getRandomColor(palette: Uint32Array) {
  if (palette.length > 0) {
    const num = palette[Math.floor(Math.random() * palette.length)];
    //console.log(num.toString(16));
    return "#" + num.toString(16).substr(2, 6);
  } else {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

function brush1(ctx: CanvasRenderingContext2D, palette: Uint32Array) {
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
function brush2(ctx: CanvasRenderingContext2D, palette: Uint32Array) {
  ctx.fillStyle = getRandomColor(palette);
  const x = Math.random() * ctx.canvas.width;
  const y = Math.random() * ctx.canvas.height;
  const rx = Math.random() * ctx.canvas.width * 0.25;
  const ry = Math.random() * ctx.canvas.height * 0.25;
  ctx.beginPath();
  ctx.fillRect(x, y, rx, ry);
}

function brushSmallRound(ctx: CanvasRenderingContext2D, palette: Uint32Array) {
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

function brushBox(ctx: CanvasRenderingContext2D, palette: Uint32Array) {
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

export default function brush(cvs: HTMLCanvasElement, palette: Uint32Array) {
  const ctx = cvs.getContext("2d");
  const brushType = Math.random();
  //   if (brushType < 0.33333333) {
  //     brush1(ctx);
  //   } else if (brushType < 0.6666666) {
  //     brushSmallRound(ctx);
  //   } else if (brushType < 0.833333333) {
  //     brush2(ctx);
  //   } else {
  //     brushBox(ctx);
  //   }
  brush1(ctx, palette);
  //brushSmallRound(ctx);
  //brushBox(ctx);
  //brush2(ctx);
  return ctx.getImageData(0, 0, cvs.width, cvs.height);
}
