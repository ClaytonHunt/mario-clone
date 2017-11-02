import { Entity } from '../entity.js';
import {loadSpriteSheet} from "../loaders.js";
import PendulumWalk from "../traits/pendulum-walk.js";

export function loadGoomba() {
  return loadSpriteSheet('goomba').then(GoombaFactory);
}

function GoombaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawGoomba(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0,0);
  }

  return function create() {
    const goomba = new Entity();
    goomba.size.set(16, 16);
    goomba.lifetime = 0;

    goomba.addTrait(new PendulumWalk());

    goomba.draw = drawGoomba;

    return goomba;
  }
}
