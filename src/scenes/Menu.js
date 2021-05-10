class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
        this.playButton = this.add.text(100, 100, 'Play', {fill: '#0ff'});
        this.playButton.setInteractive();
        this.playButton.on('pointerup', () => { loadPlayScene() });

        this.TutorialButton = this.add.text(100, 200, 'Play', {fill: '#0ff'});
        this.TutorialButton.setInteractive();
        this.TutorialButton.on('pointerup', () => { loadPlayScene() });
    }

    loadPlayScene() {
        this.scene.start('playScene');
    }

    loadTutorial() {
        this.scene.start('tutorialScene');
    }

    update() {
        
    }
}