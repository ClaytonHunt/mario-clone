import { Trait } from '../entity.js';

export class Go extends Trait {
  constructor() {
    super('go');

    this.direction = 0;
    this.speed = 6000;

    this.distance = 0;
    this.heading = false;
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.direction * deltaTime;

    if(this.direction) {
      this.heading = this.direction === -1;
      this.distance += Math.abs(entity.vel.x) * deltaTime;
    } else {
      this.direction = 0;
    }
  }
}
