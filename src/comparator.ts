function c1(a: ImageData, b: ImageData): number {
  let dist = 0;
  for (let i = 0; i < a.data.length; ++i) {
    const d = Math.abs(a.data[i] / 255.0 - b.data[i] / 255.0);
    dist += d * d;
  }
  return dist;
}

export default function compare(a: ImageData, b: ImageData): number {
  return c1(a, b);
}
