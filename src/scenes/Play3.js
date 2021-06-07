class Play3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    preload() {
        this.load.image('tileset.png', 'assets/tileset.png');
        this.load.image('player', 'assets/scientist.png');
        this.load.image('enemy', 'assets/Alien.png');
        this.load.image('sector', 'assets/sector.png');
        this.load.tilemapTiledJSON('tilesets3', 'assets/invisibility.json');
        this.load.audio('footsteps', './assets/footsteps.wav');
        this.load.audio('theme', './assets/title theme.wav');
        this.load.image('closedDoor', './assets/tileSprites/closedDoor.png')
        this.load.image('openDoor', './assets/tileSprites/openDoor.png')
    }

    playMusic() {
        this.bgm = this.sound.add('theme',{volume: 0.2,loop:true});
        this.sfx = this.sound.add('picked',{volume: 0.2});
        this.bgm.play();
    }

    create() {
        this.paused = false;
        this.DefineInputs();
        currentLevel = 'level3';

        const map = this.make.tilemap({ key: 'tilesets3' });
        const tileset = map.addTilesetImage('tileset', 'tileset.png');
        map.createLayer('Floor', tileset);
        this.mask = map.createLayer('Mask', tileset);
        this.obstacles = map.createLayer('Wall', tileset);
        this.events = map.objects[0].objects;
        this.spawnXY = this.events.find((event)=>{return event.name === "respawn"});
        this.tempVent = this.events.find((event)=>{return event.name === "VentIn"
                                                    && event.type == 1});
        this.tempVentOut = this.events.find((event)=>{return event.name === "VentOut"
                                                        && event.type == 1});
        this.tempVent1 = this.events.find((event)=>{return event.name === "VentIn"
                                                        && event.type == 2});
        this.tempVentOut1 = this.events.find((event)=>{return event.name === "VentOut"
                                                        && event.type == 2});
        this.Exit = this.events.find((event)=>{return event.name === "Exit"});

        this.pathArray = [];
        for(let i = 1;;i++){
            let tempPath = this.events.find((event)=>{return event.name === "path"
            && event.type == i});
            if(tempPath){
                this.pathArray.push(tempPath);
            }else{
                break;
            }
        }

        this.pickupXY = this.events.find((event)=>{return event.name === "cloak"});
        this.objects = map.createLayer('Object', tileset);
        
        
        // Phyiscs Bodies include player, enemies, enemy detections
        this.CreatePhysicsBodies();

        // Sets up camera zoom, allows it to follow player
        this.SetCamera(map);
        
        // Sets up all collisions between player, enemy, obstacles
        this.CreateCollisionEvents();

        map.createLayer('Overhead', tileset);
        this.scene.launch("HUDScene");

        this.player.ready.dash = true;
        this.player.count.invisibility = 0;
        this.player.count.teleport = 3;
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

        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.player.body.setSize(16, 8);
        this.player.body.setOffset(8, 22);

        this.enemies = [];
        for(let path of this.pathArray){
            this.enemies.push(CreateEnemy(path, this));
        }

        this.pickup = this.physics.add.image(this.pickupXY.x, this.pickupXY.y, 'invisibilitySprite');
        this.pickup.setImmovable(true);

        for(let event of this.events){
            if(event.name != "path"
            && event.name != "respawn"
            && event.name != "acid"){
                let indicator = this.physics.add.sprite(event.x, event.y - 25, 'indicator', 0);
                indicator.anims.play('arrow');
            }
        }
    }

    CreateCollisionEvents() {
        this.objects.setCollisionByProperty({ collides: true });
        this.obstacles.setCollisionByExclusion([-1]);
        this.objects.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, this.objects);
    }

    stopDash() {
        this.player.stopDash();
    }

    update() {
        this.player.update();

        for(let enemy of this.enemies){
            enemy.update();
        }

        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.Exit.x, this.Exit.y) < 24){
                // Make it start the next level
                this.scene.stop();
                this.scene.stop("HUDScene");
                this.scene.start("endScreenScene");
                this.sound.stopAll();

        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVent.x, this.tempVent.y) < 24){
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.cameras.main.fadeOut(60);
                this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                    camera.fadeIn(600);
                });
                this.player.x = this.tempVentOut.x;
                this.player.y = this.tempVentOut.y;
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVentOut.x, this.tempVentOut.y) < 24){
            game.prompt.text =  "Press F to go through vents";
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.cameras.main.fadeOut(60);
                this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                    camera.fadeIn(600);
                });
                this.player.x = this.tempVent.x;
                this.player.y = this.tempVent.y;
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVent1.x, this.tempVent1.y) < 24){
            game.prompt.text =  "Press F to go through vents";
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.cameras.main.fadeOut(60);
                this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                    camera.fadeIn(600);
                });
                this.player.x = this.tempVentOut1.x;
                this.player.y = this.tempVentOut1.y;
                game.prompt.text = "Keep your distance from the Alien. He can see the area highlighted in yellow"+
                                    "\nHe can also hear your footsteps from a smaller range. Find your way out.";
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVentOut1.x, this.tempVentOut1.y) < 24){
            game.prompt.text =  "Press F to go through vents";
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.cameras.main.fadeOut(60);
                this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                    camera.fadeIn(600);
                });
                this.player.x = this.tempVent1.x;
                this.player.y = this.tempVent1.y;
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.pickup.x,  this.pickup.y) < 32){
                this.player.count.invisibility = 6;
                this.sfx.play();
                game.prompt.text =  "Invisibility cloak found. \nPress Q to be invisible.";
                this.pickup.destroy();
        }
    }

    distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }
}