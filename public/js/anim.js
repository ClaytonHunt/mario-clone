export function createAnim(frames, frameTime) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor((distance / frameTime) % frames.length);
    return frames[frameIndex];
  }
}
