"use strict";
let config = {
    type: Phaser.WEBGL,
    //canvas mode causing rendering bugs, weird 
    width: 1024,
    height: 576,
      fps: {
          target: 60,
          forceSetTimeOut: true
          },
          physics: {
            default: 'arcade',
            arcade: {
                //debug: true,
                gravity: { y: 0 }
            }
        },
    scene: [Menu, Tutorial, Play, Pause, HUD, Play2, Play3, Play4, Credits, EndScreen]
}

let game = new Phaser.Game(config);

// Declare Keys (Change if needed)
let keyA, keyD, keyW, keyS, keyE, keyF, keyQ, keyR, keySPACE, keyESC, keySHIFT;
let cursors;

let currentLevel;

let eventListenerAdded = false;

let unlockedLevels = {
    tutorial: true,
    level1: false,
    level2: false,
    level3: false,
    level4: false
};