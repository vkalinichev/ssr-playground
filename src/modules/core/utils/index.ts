export function isSsr(): boolean {
  return typeof window === 'undefined';
}

export function randomBool(probability = 0.5): boolean {
  return Math.random() < probability;
}

export function randomInt(min: number, max: number): number {
  return min + Math.round(Math.random() * (max - min));
}
