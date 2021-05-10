class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
        this.playButton = this.add.text(100, 100, 'Play', {fill: '#0ff'});
        this.playButton.setInteractive();
        this.playButton.on('pointerup', () => { this.loadPlayScene() });

        this.tutorialButton = this.add.text(100, 200, 'Tutorial', {fill: '#0ff'});
        this.tutorialButton.setInteractive();
        this.tutorialButton.on('pointerup', () => { this.loadTutorialScene() });
    }

    loadPlayScene() {
        this.scene.start('playScene');
    }

    loadTutorialScene() {
        this.scene.start('tutorialScene');
    }

    update() {
        
    }
}