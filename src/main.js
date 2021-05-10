"use strict";
let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 920,
      fps: {
          target: 60,
          forceSetTimeOut: true
          },
    scene: [Menu, Tutorial, Play]
}

let game = new Phaser.Game(config);

// Declare Keys (Change if needed)
let keyA, keyD, keyW, keyS, keyE, keyF, keyQ, keyR, keySPACE, keyEsc;
let cursors;