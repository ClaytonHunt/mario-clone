import { Entity } from '../entity.js';
import {loadSpriteSheet} from "../loaders.js";
import PendulumWalk from "../traits/pendulum-walk.js";

export function loadKoopa() {
  return loadSpriteSheet('koopa').then(KoopaFactory);
}

function KoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawKoopa(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0,0, this.vel.x < 0);
  }

  return function create() {
    const koopa = new Entity();
    koopa.size.set(16, 16);
    koopa.offset.y = 8;
    koopa.lifetime = 0;

    koopa.addTrait(new PendulumWalk());

    koopa.draw = drawKoopa;

    return koopa;
  }
}
