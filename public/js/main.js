import {Timer} from './timer.js';
import {loadLevel} from './loaders.js';
import {init} from './initialization.js';
import { setupKeyboard } from './input.js';
import {createMario} from './entities.js';
import {Camera} from "./camera.js";
import {createCollisionLayer, createCameraLayer} from "./layers.js";
import { setupMouseControl } from "./debug.js";

Promise.all([
  init(),
  loadLevel('1-1'),
  createMario()
]).then(([screen, level, mario]) => {
  const camera = new Camera();
  window.camera = camera;
  mario.pos.set(64, 64);

  level.comp.layers.push(createCollisionLayer(level));
  level.comp.layers.push(createCameraLayer(camera));

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(screen.context , camera);
  };

  timer.start();

  // Debug functions
  setupMouseControl(screen.canvas, mario, camera);
});
