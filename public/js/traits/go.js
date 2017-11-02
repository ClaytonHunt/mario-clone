import { Trait } from '../entity.js';

export class Go extends Trait {
  constructor() {
    super('go');

    this.direction = 0;
    this.acceleration = 400;
    this.deceleration = 300;
    this.dragFactor = 0;

    this.distance = 0;
    this.heading = false;
  }

  update(entity, deltaTime) {
    const absX = Math.abs(entity.vel.x);

    if(this.direction !== 0) {
      entity.vel.x += this.acceleration * deltaTime * this.direction;

      if(entity.jump ){
        if(!entity.jump.falling) {
          this.heading = this.direction === -1;
        }
      } else {
        this.heading = this.direction === -1;
      }

    } else if (entity.vel.x !==0) {
      const decel = Math.min(absX, this.deceleration * deltaTime);
      entity.vel.x -= entity.vel.x > 0 ? decel : -decel;
    } else {
      this.distance = 0;
    }

    entity.vel.x -= this.dragFactor * entity.vel.x * absX; // calculate drag
    this.distance += absX * deltaTime;
  }
}
