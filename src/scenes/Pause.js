class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    preload() {

    }

    create() {
        this.add.text(100, 200, 'Paused', {fill: '#0ff'});
    }

    update() {

    }
}