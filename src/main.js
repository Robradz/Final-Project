"use strict";
let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 576,
      fps: {
          target: 60,
          forceSetTimeOut: true
          },
          physics: {
            default: 'arcade',
            arcade: {
                debug: true,
                gravity: { y: 0 }
            }
        },
    scene: [Menu, Tutorial, Play, Pause, HUD]
}

let game = new Phaser.Game(config);

// Declare Keys (Change if needed)
let keyA, keyD, keyW, keyS, keyE, keyF, keyQ, keyR, keySPACE, keyESC, keySHIFT;
let cursors;

let currentLevel;