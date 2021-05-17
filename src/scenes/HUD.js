class HUD extends Phaser.Scene {
    constructor() {
        super("HUDScene");
        console.log("ww");
        this.returnScene;
    }

    preload() {

    }

    create() {
        game.prompt = this.add.text(340, 20, "MOVE:WASD ECS:PAUSE/RESUME"
        +'\nGo to the lighter area and press F to go through the vent', {fill: '#0ff'});
    }


    update() {

    }
}