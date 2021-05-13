class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
        this.isPaused = false;
        this.returnScene;
    }

    preload() {

    }

    create() {
        this.add.text(100, 200, 'Paused', {fill: '#0ff'});
    }

    checkPause(key) {
        
    }

    update() {

    }
}