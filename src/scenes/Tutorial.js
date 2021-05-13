class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.image('Tilemap.png', 'assets/Tilemap.png');
        this.load.image('player', 'assets/tempdoc.png');
        this.load.tilemapTiledJSON('tilesets', 'assets/tempmap.json');

    }

    create() {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        const map = this.make.tilemap({ key: 'tilesets' });
        const tileset = map.addTilesetImage('tilesets', 'Tilemap.png');
        map.createLayer('Background', tileset);
        this.obstacles = map.createLayer('Obstacles', tileset);
        this.events = map.objects[0].objects;
        console.log(this.events);
        map.createLayer('Foreground', tileset);
        this.cameras.main.setZoom(2);
        this.player = this.physics.add.image(300, 300, 'player');
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.obstacles.setCollisionByProperty({ collides: true });
        this.obstacles.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.obstacles);
    }

    update() {
        this.player.body.setVelocity(0);
        if (keyA.isDown)
        {
            this.player.body.setVelocityX(-100);
        }
        else if (keyD.isDown)
        {
            this.player.body.setVelocityX(100);
        }

        if (keyW.isDown)
        {
            this.player.body.setVelocityY(-100);
        }
        else if (keyS.isDown)
        {
            this.player.body.setVelocityY(100);
        }
    }
}