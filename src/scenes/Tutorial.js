class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.image('Tilemap.png', 'assets/Tilemap.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tempmap.json');

    }

    create() {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cameras.main.setBounds(0, 0, 720, 720);
        this.physics.world.setBounds(0, 0, 3392, 240);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('Tilemap', 'Tilemap.png');
        map.createLayer('Tile Layer 1', tileset);
        this.cameras.main.setZoom(1.25);
        


    }

    update() {
        
    }
}