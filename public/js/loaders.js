import {Level} from './level.js';
import {SpriteSheet} from './sprite-sheet.js';
import {createBackgroundLayer, createSpriteLayer} from "./layers.js";
import {createAnim} from "./anim.js";

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });

    image.src = url;
  });
}

function loadJSON(url) {
  return fetch(url).then(r => r.json());
}

function createTiles(level, backgrounds) {
  function applyRange(background, xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type
        });
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach(range => {
      if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;
        applyRange(background, xStart, xLength, yStart, yLength);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1);
      }
    });
  });
}

export function loadSpriteSheet(name) {
  return loadJSON(`/sprites/${name}.json`).then(sheetSpec => Promise.all([
    sheetSpec,
    loadImage(sheetSpec.imageURL)
  ])).then(([sheetSpec, image]) => {
    const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

    if (sheetSpec.tiles) {
      sheetSpec.tiles.forEach(tile => {
        sprites.defineTile(tile.name, ...tile.index);
      });
    }

    if(sheetSpec.frames) {
      sheetSpec.frames.forEach(frameSpec => {
        sprites.define(frameSpec.name, ...frameSpec.rect);
      });
    }

    if(sheetSpec.animations) {
      sheetSpec.animations.forEach(animSpec => {
        const animation = createAnim(animSpec.frames, animSpec.frameLength);
        sprites.defineAnim(animSpec.name, animation);
      });
    }

    return sprites;
  });
}

export function loadLevel(name) {
  return loadJSON(`/levels/${name}.json`).then(levelSpec => Promise.all([
    levelSpec,
    loadSpriteSheet(levelSpec.spriteSheet)
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    const spriteLayer = createSpriteLayer(level.entities);

    level.comp.layers.push(backgroundLayer);
    level.comp.layers.push(spriteLayer);

    return level
  }));
}
