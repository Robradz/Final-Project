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
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        const map = this.make.tilemap({ key: 'tilesets' });
        const tileset = map.addTilesetImage('tilesets', 'Tilemap.png');
        map.createLayer('Background', tileset);
        this.obstacles = map.createLayer('Obstacles', tileset);
        this.events = map.objects[0].objects;
        console.log(this.events);
        map.createLayer('Foreground', tileset);
        this.cameras.main.setZoom(2);
        this.player = new Player(this, 300, 300, 'player');
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.cameras.main.startFollow(this.player, false, 0.08, 0.08, 0, 0);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.obstacles.setCollisionByProperty({ collides: true });
        this.obstacles.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.obstacles);

        window.addEventListener('keydown', (e) => this.checkPause(e.key));
    }

    update() {
        this.player.update();
    }

    checkPause(key) {
        if (key == "Escape" && !this.paused) {
            this.paused = true;
            console.log("Paused: " + this.paused);
            this.scene.pause();
            this.scene.launch("pauseScene");
        } else if (key == "Escape" && this.paused) {
            this.paused = false;
            console.log("Paused: " + this.paused);
            this.scene.stop("pauseScene");
            this.scene.resume("playScene");
        }
    }
}