/** Exponential moving average: smooths incoming samples. */
export function ema(previous: number | null, sample: number, alpha: number): number {
  if (previous === null) return sample;
  return alpha * sample + (1 - alpha) * previous;
}

/** Simple moving average over the last `window` values. */
export function movingAverage(samples: number[], window: number): number {
  if (samples.length === 0) return 0;
  const slice = samples.slice(-window);
  const sum = slice.reduce((a, b) => a + b, 0);
  return sum / slice.length;
}
