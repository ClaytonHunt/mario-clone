export function setupMouseControl(canvas, entity, camera) {
  let lastEvent;

  ['mousedown', 'mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if(event.buttons === 1) {
        const widthRatio = canvas.width / parseInt(canvas.style.width, 10);
        const heightRatio = canvas.height / parseInt(canvas.style.height, 10);

        entity.vel.set(0, 0);
        entity.pos.set(
          (event.offsetX * widthRatio) + camera.pos.x,
          (event.offsetY * heightRatio) + camera.pos.y);
      } else if (event.buttons === 2 && lastEvent && lastEvent.type == 'mousemove') {
        const widthRatio = canvas.width / parseInt(canvas.style.width, 10);
        const heightRatio = canvas.height / parseInt(canvas.style.height, 10);

        camera.pos.x -= (event.offsetX * widthRatio) - (lastEvent.offsetX * widthRatio);
      }

      lastEvent = event;

      canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
      })
    })
  });
}