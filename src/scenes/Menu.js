class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('theme', './assets/title theme.wav');
    }

    create() {
        // Can only play tutorialScene now
        //
        // this.playButton = this.add.text(100, 100, 'Play', {fill: '#0ff'});
        // this.playButton.setInteractive();
        // this.playButton.on('pointerup', () => { this.loadPlayScene() });

        this.tutorialButton = this.add.text(100, 200, 'Tutorial(Click on me)', {fill: '#0ff'});
        this.tutorialButton.setInteractive();
        this.tutorialButton.on('pointerup', () => { this.loadTutorialScene() });

        this.bgm = this.sound.add('theme',{volume: 1,loop:true});
        this.bgm.play();
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