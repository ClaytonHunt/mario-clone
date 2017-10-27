import { Trait } from '../entity.js';

export class Go extends Trait {
  constructor() {
    super('go');

    this.direction = 0;
    this.speed = 3000;
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.direction * deltaTime;
  }
}