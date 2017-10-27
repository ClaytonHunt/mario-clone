import { Trait } from '../entity.js';

export class ClickPosition extends Trait {
  constructor() {
    super('click_position');

    this.eventsHandled = false;
  }

  update(entity, deltaTime) {
    if(!this.eventsHandled) {
      const canvas = document.getElementById('screen');

      ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
          if(event.buttons === 1) {
            const widthRatio = canvas.width / parseInt(canvas.style.width, 10);
            const heightRatio = canvas.height / parseInt(canvas.style.height, 10);

            entity.vel.set(0, 0);
            entity.pos.set(
              (event.offsetX * widthRatio) + camera.pos.x,
              (event.offsetY * heightRatio) + camera.pos.y);
          }
        })
      });

      this.eventsHandled = true;
    }
  }
}