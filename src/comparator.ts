const STEP_SIZE = 1;

// sum of Euclidean distance per pixel
function c1(a: ImageData, b: ImageData): number {
  let dist = 0;
  let dr, dg, db;
  for (let i = 0; i < a.data.length; i += 4 * STEP_SIZE) {
    dr = a.data[i] / 255.0 - b.data[i] / 255.0;
    dist += dr * dr;
    dg = a.data[i + 1] / 255.0 - b.data[i + 1] / 255.0;
    dist += dg * dg;
    db = a.data[i + 2] / 255.0 - b.data[i + 2] / 255.0;
    dist += db * db;
  }
  return dist;
}

// sum of linear delta per pixel
function c2(a: ImageData, b: ImageData): number {
  let dist = 0;
  let dp;
  for (let i = 0; i < a.data.length; i += 4 * STEP_SIZE) {
    dp =
      Math.abs(a.data[i] - b.data[i]) +
      Math.abs(a.data[i + 1] - b.data[i + 1]) +
      Math.abs(a.data[i + 2] - b.data[i + 2]);
    dp /= 3.0 * 255.0;
    dist += dp;
  }
  return dist;
}

export default function compare(a: ImageData, b: ImageData): number {
  return c1(a, b);
}
