class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('background', '../../assets/Menu_1.png');
    }

    create() {
        this.add.image(game.config.width / 2, 
            game.config.height / 2 ,'background').setScale(1.7, 1.5).setAlpha(0.25);

        // Back to Menu Text
        this.creditsButton = this.add.text(
            game.config.width - 18, 
            game.config.height, 
            'Menu', 
            {align: 'right', fontFamily: 'potra', fill: '#000'}).setOrigin(1, 1).setFontSize(40);

        this.creditsButton = this.add.text(
            game.config.width - 20, 
            game.config.height, 
            'Menu', 
            {align: 'right', fontFamily: 'potra', fill: '#2080FF'}).setOrigin(1, 1).setFontSize(40);
        this.creditsButton.setInteractive();
        this.creditsButton.on('pointerover', 
            () => { this.creditsButton.setStyle({ fill: '#0aa'}) });
        this.creditsButton.on('pointerout', 
            () => { this.creditsButton.setStyle({ fill: '#2080FF'}) });
        this.creditsButton.on('pointerup', 
            () => { this.scene.start('menuScene'); });

        // Robert Radzville
        this.RobertRadzville = this.add.text(
            game.config.width  / 4, 
            game.config.height / 4 - 50, 
            'Robert\n Radzville', 
            {align: 'center', fontFamily: 'locust', fill: '#00214f'}).setOrigin(.5, .5).setFontSize(40);

        this.RobertRadzville = this.add.text(
            game.config.width  / 4 - 2, 
            game.config.height / 4 - 52, 
            'Robert\n Radzville', 
            {align: 'center', fontFamily: 'locust', fill: '#006aff'}).setOrigin(.5, .5).setFontSize(40);

        // Zachary Lu
        this.ZacharyLu = this.add.text(
            game.config.width  / 4 * 3, 
            game.config.height / 4 - 50, 
            'Zachary Lu', 
            {align: 'center', fontFamily: 'locust', fill: '#00214f'}).setOrigin(.5, .5).setFontSize(40);

        this.ZacharyLu = this.add.text(
            game.config.width  / 4 * 3 - 2, 
            game.config.height / 4 - 52, 
            'Zachary Lu', 
            {align: 'center', fontFamily: 'locust', fill: '#006aff'}).setOrigin(.5, .5).setFontSize(40);

        // Jin Liu
        this.JinLiu = this.add.text(
            game.config.width  / 4, 
            game.config.height / 4 * 3 - 50, 
            'Jin Liu', 
            {align: 'center', fontFamily: 'locust', fill: '#00214f'}).setOrigin(.5, .5).setFontSize(40);

        this.JinLiu = this.add.text(
            game.config.width  / 4 - 2, 
            game.config.height / 4 * 3 - 52, 
            'Jin Liu', 
            {align: 'center', fontFamily: 'locust', fill: '#006aff'}).setOrigin(.5, .5).setFontSize(40);

        // Jerry Su
        this.JerrySu = this.add.text(
            game.config.width  / 4 * 3, 
            game.config.height / 4 * 3 - 50, 
            'Jerry Su', 
            {align: 'center', fontFamily: 'locust', fill: '#00214f'}).setOrigin(.5, .5).setFontSize(40);

        this.JerrySu = this.add.text(
            game.config.width  / 4 * 3 - 2, 
            game.config.height / 4 * 3 - 52, 
            'Jerry Su', 
            {align: 'center', fontFamily: 'locust', fill: '#006aff'}).setOrigin(.5, .5).setFontSize(40);












        // ROLES
        // Robert Radzville
        this.RobertRadzville = this.add.text(
            game.config.width  / 4, 
            game.config.height / 4 - 50 + 40, 
            'Mechanics\nScene Management\nMenus and HUD', 
            {align: 'center', fontFamily: 'potra', fill: '#00214f'}).setOrigin(.5, 0).setFontSize(40);

        this.RobertRadzville = this.add.text(
            game.config.width  / 4 - 2, 
            game.config.height / 4 - 52 + 40, 
            'Mechanics\nScene Management\nMenus and HUD', 
            {align: 'center', fontFamily: 'potra', fill: '#006aff'}).setOrigin(.5, 0).setFontSize(40);

        // Zachary Lu
        this.ZacharyLu = this.add.text(
            game.config.width  / 4 * 3, 
            game.config.height / 4 - 50 + 40, 
            'Level Art \nLevel Design \nMisc. Sprite Art', 
            {align: 'center', fontFamily: 'potra', fill: '#00214f'}).setOrigin(.5, 0).setFontSize(40);

        this.ZacharyLu = this.add.text(
            game.config.width  / 4 * 3 - 2, 
            game.config.height / 4 - 52 + 40, 
            'Level Art \nLevel Design \nMisc. Sprite Art', 
            {align: 'center', fontFamily: 'potra', fill: '#006aff'}).setOrigin(.5, 0).setFontSize(40);

        // Jin Liu
        this.JinLiu = this.add.text(
            game.config.width  / 4, 
            game.config.height / 4 * 3 - 50 + 40, 
            'Enemy AI \nMap-Player \nInteractions', 
            {align: 'center', fontFamily: 'potra', fill: '#00214f'}).setOrigin(.5, 0).setFontSize(40);

        this.JinLiu = this.add.text(
            game.config.width  / 4 - 2, 
            game.config.height / 4 * 3 - 52 + 40, 
            'Enemy AI \nMap-Player \nInteractions', 
            {align: 'center', fontFamily: 'potra', fill: '#006aff'}).setOrigin(.5, 0).setFontSize(40);

        // Jerry Su
        this.JerrySu = this.add.text(
            game.config.width  / 4 * 3, 
            game.config.height / 4 * 3 - 50 + 40, 
            'Character Art\n Animation', 
            {align: 'center', fontFamily: 'potra', fill: '#00214f'}).setOrigin(.5, 0).setFontSize(40);

        this.JerrySu = this.add.text(
            game.config.width  / 4 * 3 - 2, 
            game.config.height / 4 * 3 - 50 + 40, 
            'Character Art\n Animation', 
            {align: 'center', fontFamily: 'potra', fill: '#006aff'}).setOrigin(.5, 0).setFontSize(40);
    }
}