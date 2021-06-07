class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
        this.isPaused = false;
    }

    preload() {

    }

    create() {
        // TITLE
        this.title = this.add.text(
            game.config.width/2, 
            game.config.height/2-100, 
            'Game Paused', 
            {fill: '#0ff', fontFamily: 'locust'}
            ).setOrigin(.5, .5).setFontSize(72);
        
        // PLAY BUTTON
        this.playButton = this.add.text(
            game.config.width/2, 
            game.config.height/2, 
            'Resume', 
            {fill: '#0dd', fontFamily: 'potra'}
            ).setOrigin(.5, .5).setFontSize(50);
        this.playButton.setInteractive();
        this.playButton.on('pointerover', 
            () => { this.playButton.setStyle({ fill: '#0aa'}) });
        this.playButton.on('pointerout', 
            () => { this.playButton.setStyle({ fill: '#0ff'}) });
        this.playButton.on('pointerup', 
            () => { 
                let curr = this.scene.get(currentLevel);
                curr.paused = false;
                console.log(currentLevel, curr.paused);
                this.scene.resume(currentLevel);
                this.scene.stop("pauseScene"); });

        // Menu
        this.menuButton = this.add.text(
            game.config.width/2, 
            game.config.height/2 + 100, 
            'Exit to Menu', 
            {fill: '#0dd', fontFamily: 'potra'}
            ).setOrigin(.5, .5).setFontSize(50);
        this.menuButton.setInteractive();
        this.menuButton.on('pointerover', 
            () => { this.menuButton.setStyle({ fill: '#0aa'}) });
        this.menuButton.on('pointerout', 
            () => { this.menuButton.setStyle({ fill: '#0ff'}) });
        this.menuButton.on('pointerup', 
            () => { console.log("yo whats going on"); 
            let curr = this.scene.get(currentLevel);
            curr.paused = false;
            this.scene.stop(currentLevel);
            this.scene.stop("HUDScene");
            this.scene.start('menuScene'); 
            this.scene.stop('pauseScene')} );
    }
}