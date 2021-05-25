class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('theme', './assets/title theme.wav');
    }

    create() {
        // TITLE
        this.title = this.add.text(
            game.config.width/2, 
            game.config.height/2-100, 
            'Secrets', 
            {fill: '#0ff'}).setOrigin(.5, .5).setFontSize(100);
        
        // PLAY BUTTON
        this.playButton = this.add.text(
            game.config.width/2, 
            game.config.height/2, 
            'Play', 
            {fill: '#0dd'}).setOrigin(.5, .5).setFontSize(50);
        this.playButton.setInteractive();
        this.playButton.on('pointerover', 
            () => { this.playButton.setStyle({ fill: '#0aa'}) });
        this.playButton.on('pointerout', 
            () => { this.playButton.setStyle({ fill: '#0ff'}) });
        this.playButton.on('pointerup', 
            () => { this.loadTutorialScene() });

        // TUTORIAL
        this.tutorialButton = this.add.text(
            game.config.width/2, 
            game.config.height/2 + 100, 
            'Tutorial', 
            {fill: '#0dd'}).setOrigin(.5, .5).setFontSize(50);
        this.tutorialButton.setInteractive();
        this.tutorialButton.on('pointerover', 
            () => { this.tutorialButton.setStyle({ fill: '#0aa'}) });
        this.tutorialButton.on('pointerout', 
            () => { this.tutorialButton.setStyle({ fill: '#0ff'}) });
        this.tutorialButton.on('pointerup', 
            () => { this.loadTutorialScene() });

        this.bgm = this.sound.add('theme',{volume: 1,loop:true});
        this.bgm.play();
    }

    // WHEN A LEVEL IS DONE, REPLACE WITH COMMENTED CODE
    loadPlayScene() {
        //this.scene.start('playScene');
        this.scene.start('tutorialScene');
    }

    loadTutorialScene() {
        this.scene.start('tutorialScene');
    }

    update() {
        
    }
}