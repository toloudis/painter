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

export function compareSubRegion(
  a: ImageData,
  b: ImageData, rect: { x: number; y: number; width: number; height: number })
{
  let dist = 0;
  let dr, dg, db;
  for (let y = rect.y; y < rect.y + rect.height; y += 1) {
    for (let x = rect.x; x < rect.x + rect.width; x += STEP_SIZE) {
      const i = 4 * (y * a.width + x);
      dr = a.data[i] / 255.0 - b.data[i] / 255.0;
      dist += dr * dr;
      dg = a.data[i + 1] / 255.0 - b.data[i + 1] / 255.0;
      dist += dg * dg;
      db = a.data[i + 2] / 255.0 - b.data[i + 2] / 255.0;
      dist += db * db;
    }
  }
  return dist;
}

// a should have w and h same as rect.
// b should be larger, and rect is the region in b to compare to a.
export function compareSubRegion2(
  a: ImageData,
  b: ImageData, rect: { x: number; y: number; width: number; height: number })
: number
{
  if (a.width !== rect.width || a.height !== rect.height) {
    throw new Error("a must have same dimensions as rect");
  }
  let dist = 0;
  let dr, dg, db;
  for (let y = 0; y < rect.height; y += 1) {
    for (let x = 0; x < rect.width; x += STEP_SIZE) {
      const ai = 4 * ((y) * a.width + (x));
      const bi = 4 * ((y + rect.y) * b.width + (x + rect.x));
      dr = a.data[ai] / 255.0 - b.data[bi] / 255.0;
      dist += dr * dr;
      dg = a.data[ai + 1] / 255.0 - b.data[bi + 1] / 255.0;
      dist += dg * dg;
      db = a.data[ai + 2] / 255.0 - b.data[bi + 2] / 255.0;
      dist += db * db;
    }
  }
  return dist;
}