import { resize } from './graphics-utilities.js';

export function init() {
  return new Promise(resolve => {
    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');
    window.addEventListener('load', resize(canvas), false);
    window.addEventListener('resize', resize(canvas), false);

    resolve({ canvas, context });
  });
}
