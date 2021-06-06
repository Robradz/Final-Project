class Play3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    preload() { // Change when we have new maps
        this.load.image('tileset.png', 'assets/tileset.png');
        this.load.image('player', 'assets/scientist.png');
        this.load.image('enemy', 'assets/Alien.png');
        this.load.image('sector', 'assets/sector.png');
        this.load.tilemapTiledJSON('tilesets', 'assets/tutorial.json');
        this.load.audio('footsteps', './assets/footsteps.wav');
        this.load.audio('theme', './assets/title theme.wav');
    }

    playMusic() {
        this.bgm = this.sound.add('theme',{volume: 1,loop:true});
        this.bgm.play();
    }

    create() {
        game.prompt.text = "";
        unlockedLevels.level3 = true;
        this.paused = false;
        this.DefineInputs();
        currentLevel = 'level3';

        const map = this.make.tilemap({ key: 'tilesets' });
        const tileset = map.addTilesetImage('tileset', 'tileset.png');
        map.createLayer('Floor', tileset);
        this.obstacles = map.createLayer('Wall', tileset);
        this.events = map.objects[0].objects;
        this.spawnXY = this.events.find((event)=>{return event.name === "respawn"});
        this.Exit = this.events.find((event)=>{return event.name === "Exit"});
        console.log(this.tempVent,this.tempVentOut);
        this.enemy1path = this.events.find((event)=>{return event.name === "path"
                                                        && event.type == 1});
        console.log(this.enemy1path);
        this.objects = map.createLayer('Object', tileset);
        
        // Phyiscs Bodies include player, enemies, enemy detections
        this.CreatePhysicsBodies();

        // Sets up camera zoom, allows it to follow player
        this.SetCamera(map);
        
        // Sets up all collisions between player, enemy, obstacles
        this.CreateCollisionEvents();


        // This launches the pause screen whenever ESC is pressed
        window.addEventListener('keydown', (e) => this.checkPause(e.key));
        map.createLayer('Overhead', tileset);
        this.scene.launch("HUDScene");
    }

    DefineInputs() {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    SetCamera(map) {
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player, false, 0.08, 0.08, 0, 0);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    CreatePhysicsBodies() {
        this.player = new Player(this, this.spawnXY.x, this.spawnXY.y, 'player');
        // this.enemy1 = new Enemy(this, this.enemy1path.x + this.enemy1path.polygon[0].x,
        //     this.enemy1path.y + this.enemy1path.polygon[0].y, 'enemy');
        // this.enemy1.depth = 10;
        // this.enemy1.path = this.enemy1path;
        // this.enemy1.cone = new Cone(this.enemy1.detectionDistance, this, this.enemy1.x,
        //     this.enemy1.y, 'sector');
        // this.enemy1.colCone = new Cone(this.enemy1.detectionDistance, this, this.enemy1.x,
        //     this.enemy1.y, 'sector');
        // this.add.existing(this.player);
        // this.physics.add.existing(this.player);
        // this.add.existing(this.enemy1);
        // this.physics.add.existing(this.enemy1);
        // this.add.existing(this.enemy1.cone);
        // this.physics.add.existing(this.enemy1.cone);
        // this.add.existing(this.enemy1.colCone);
        // this.physics.add.existing(this.enemy1.colCone);
        // this.enemy1.colCone.alpha = 0;
        // this.player.body.setSize(16, 8);
        // this.player.body.setOffset(8, 22);
        // this.enemy1.body.setSize(16, 8);
        // this.enemy1.body.setOffset(8, 22);
    }

    CreateCollisionEvents() {
        this.objects.setCollisionByProperty({ collides: true });
        this.obstacles.setCollisionByExclusion([-1]);
        this.objects.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, this.objects);
        //this.physics.add.collider(this.enemy1, this.objects);
        this.physics.add.overlap(this.enemy1.cone, this.player);
        this.physics.add.collider(this.player, this.enemy1, (player, enemy1) => {
            this.paused = true;
            // this.scene.pause();
            // this.scene.launch("pauseScene");
            this.scene.restart();
            //game.prompt.text = "YOU GOT CAUGHT!";
            this.player.x = this.spawnXY.x;
            this.player.y = this.spawnXY.y;
            this.player.sfx.stop();
        });
        this.physics.add.collider(this.enemy1, this.obstacles);
        this.physics.add.collider(this.enemy1.colCone, this.obstacles,
            (colCone, obstacles) => {
            });
    }

    stopDash() {
        this.player.stopDash();
    }

    update() {
        this.player.update();
        this.enemy1.update();
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.Exit.x, this.Exit.y) < 24){
                game.prompt.text = "This is the exit. This level is supposed to be ended here.";
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVent.x, this.tempVent.y) < 24){
            game.prompt.text =  "Press F to go through the vent";
            if (keyF.isDown) {
                this.player.x = this.tempVentOut.x;
                this.player.y = this.tempVentOut.y;
                game.prompt.text = "keep a distance with the alien, your footsteps can attract him."+
                                    "\nIf he got attracted, he will trail you. Find a way out.";
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVent1.x, this.tempVent1.y) < 24){
            game.prompt.text =  "Press F to go through the vent";
            if (keyF.isDown) {
                this.player.x = this.tempVentOut1.x;
                this.player.y = this.tempVentOut1.y;
                game.prompt.text = "keep a distance with the alien, your footsteps can attract him."+
                                    "\nIf he got attracted, he will trail you. Find a way out.";
            }
        }
    }

    distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
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
            this.scene.resume("level3");
        }
    }
}