function c1(a: ImageData, b: ImageData): number {
  let dist = 0;
  let dr, dg, db;
  for (let i = 0; i < a.data.length; i += 4) {
    dr = a.data[i] / 255.0 - b.data[i] / 255.0;
    dist += dr * dr;
    dg = a.data[i + 1] / 255.0 - b.data[i + 1] / 255.0;
    dist += dg * dg;
    db = a.data[i + 2] / 255.0 - b.data[i + 2] / 255.0;
    dist += db * db;
  }
  return dist;
}

export default function compare(a: ImageData, b: ImageData): number {
  return c1(a, b);
}
