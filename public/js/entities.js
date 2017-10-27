import { Entity } from './entity.js';
import { Go } from './traits/go.js';
import { Jump } from './traits/jump.js';
import {createAnim} from "./anim.js";
import {loadSpriteSheet} from "./loaders.js";

export function createMario() {
  return loadSpriteSheet('mario').then(sprite => {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 5);

    function routeFrame(mario) {
      if(mario.go.direction !== 0) {
        return runAnim(mario.go.distance);
      }

      return 'idle';
    }

    mario.draw = function drawMario(context) {
      sprite.draw(routeFrame(mario), context, 0, 0, mario.go.heading);
    };

    return mario;
  });
}
