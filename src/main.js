"use strict";
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 600,
      fps: {
          target: 60,
          forceSetTimeOut: true
          },
    scene: [Menu, Tutorial, Play, Pause]
}

let game = new Phaser.Game(config);

// Declare Keys (Change if needed)
let keyA, keyD, keyW, keyS, keyE, keyF, keyQ, keyR, keySPACE, keyEsc, keySHIFT;
let cursors;