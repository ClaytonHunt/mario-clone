import { Vector2 } from './math.js';
import BoundingBox from "./bounding-box.js";

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right')
};

export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  obstruct() { }

  update() {
    console.warn('Unhandled update call in Trait');
  }
}

export class Entity {
  constructor() {
    this.pos = new Vector2(0, 0);
    this.vel = new Vector2(0, 0);
    this.size = new Vector2(0, 0);
    this.offset = new Vector2(0,0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.lifetime = 0;

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  obstruct(side) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side);
    })
  }

  update(deltaTime) {
    this.lifetime += deltaTime;
    this.traits.forEach(trait => {
      trait.update(this, deltaTime);
    })
  }
}
