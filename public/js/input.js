import {KeyboardState} from './keyboard-state.js';

export function setupKeyboard(mario) {
  const input = new KeyboardState();

  input.addMapping('Space', (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.addMapping('ShiftLeft', (keyState) => {
    mario.turbo(keyState);
  });

  input.addMapping('KeyD', (keyState) => {
    mario.go.direction += keyState ? 1 : -1;
  });

  input.addMapping('KeyA', (keyState) => {
    mario.go.direction += keyState ? -1 : 1;
  });

  return input;
}
