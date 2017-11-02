import {Timer} from './timer.js';
import {init} from './initialization.js';
import { setupKeyboard } from './input.js';
import {loadMario} from './entities/mario.js';
import {Camera} from "./camera.js";
import {createCollisionLayer, createCameraLayer} from "./layers.js";
import { setupMouseControl } from "./debug.js";
import {loadLevel} from "./loaders/level.js";
import { loadEntities } from './entities.js';

const debug = true;

Promise.all([
  init(),
  loadLevel('1-1'),
  loadEntities()
]).then(([screen, level, entity]) => {
  const camera = new Camera();
  window.camera = camera;

  console.log(entity);

  const mario = entity.mario();
  mario.pos.set(64, 64);
  level.entities.add(mario);

  const goomba = entity.goomba();
  goomba.pos.x = 220;
  level.entities.add(goomba);

  const koopa = entity.koopa();
  koopa.pos.x = 225;
  level.entities.add(koopa);

  if(debug) {
    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createCameraLayer(camera));
    setupMouseControl(screen.canvas, mario, camera);
  }

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(screen.context , camera);

    if(mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }
  };

  timer.start();
});
