class LevelSelect extends Phaser.Scene {
    constructor() {
        super("levelSelectionScene");
    }

    preload() {
        this.load.image('background', '../../assets/Menu_1.png');
        this.load.image('background', '../../assets/Menu_1.png');
        this.load.image('background', '../../assets/Menu_1.png');
    }
}