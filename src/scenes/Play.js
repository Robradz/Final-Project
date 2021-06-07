class Play extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('tileset.png', 'assets/tileset.png');
        this.load.image('player', 'assets/scientist.png');
        this.load.image('enemy', 'assets/Alien.png');
        this.load.image('sector', 'assets/sector.png');
        this.load.tilemapTiledJSON('tilesets1', 'assets/dash.json');
        this.load.audio('footsteps', './assets/footsteps.wav');
        this.load.audio('theme', './assets/title theme.wav');
        this.load.image('closedDoor', './assets/tileSprites/closedDoor.png')
        this.load.image('openDoor', './assets/tileSprites/openDoor.png')
        this.load.image('key', './assets/keycard.png')
        this.load.spritesheet('door', './assets/doorAnim.png', 
        {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('acidPool', './assets/acidAnim.png', 
        {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 3});
    }

    playMusic() {
        this.bgm = this.sound.add('theme',{volume: 0.2,loop:true});
        this.bgm.play();
    }

    create() {
        this.paused = false;
        this.DefineInputs();
        currentLevel = 'level1';

        const map = this.make.tilemap({ key: 'tilesets1' });
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
        this.bootXY = this.events.find((event)=>{return event.name === "Boot"});
        this.key1 = this.events.find((event)=>{return event.name === "key"
        && event.type == 1});
        this.key2 = this.events.find((event)=>{return event.name === "key"
        && event.type == 2});
        this.objects = map.createLayer('Object', tileset);
        this.door1 = this.events.find((event)=>{return event.name === "door"
        && event.type == 1});
        this.door2 = this.events.find((event)=>{return event.name === "door"
        && event.type == 2});
        this.acidXY = this.events.find((event)=>{return event.name === "acid"});
        // Phyiscs Bodies include player, enemies, enemy detections
        this.CreatePhysicsBodies();

        // Sets up camera zoom, allows it to follow player
        this.SetCamera(map);
        
        // Sets up all collisions between player, enemy, obstacles
        this.CreateCollisionEvents();


        // This launches the pause screen whenever ESC is pressed
        if (!eventListenerAdded) {
            window.addEventListener('keydown', (e) => this.checkPause(e.key));
            eventListenerAdded = true;
        }
        map.createLayer('Overhead', tileset);
        this.scene.launch("HUDScene");

        this.player.ready.dash = false;
        this.player.count.invisibility = 0;
        this.player.count.teleport = 0;
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

        this.anims.create({
            key: 'acidAnim',
            frames: this.anims.generateFrameNumbers('acidPool', { 
            start: 0, end: 3, first: 0}),
            frameRate: 8,
            repeat: -1
            });
        this.acidpool = this.physics.add.sprite(this.acidXY.x, this.acidXY.y, 'acidPool', 0);
        this.acidpool.setImmovable(true);
        this.acidpool.anims.play('acidAnim');
        this.add.existing(this.player);
        this.physics.add.existing(this.player);

        this.player.body.setSize(16, 8);
        this.player.body.setOffset(8, 22);

        this.enemies = [];
        for(let path of this.pathArray){
            this.enemies.push(CreateEnemy(path, this));
        }

        this.bootPickup = this.physics.add.image(this.bootXY.x, this.bootXY.y, 'dashSprite');
        this.bootPickup.setImmovable(true);
        this.keyPickup1 = this.physics.add.image(this.key1.x, this.key1.y, 'key');
        this.keyPickup1.setImmovable(true);
        this.keyPickup2 = this.physics.add.image(this.key2.x, this.key2.y, 'key');
        this.keyPickup2.setImmovable(true);
        this.anims.create({
            key: 'doorAnim',
            frames: this.anims.generateFrameNumbers('door', { start: 0, end: 5 }),
            frameRate: 10
        });
        this.closedDoor1 = this.physics.add.sprite(this.door1.x, this.door1.y, 'closedDoor', 0);
        this.closedDoor1.depth = 10;
        this.closedDoor1.setImmovable(true);
        this.closedDoor2 = this.physics.add.sprite(this.door2.x, this.door2.y, 'closedDoor', 0);
        this.closedDoor2.depth = 10;
        this.closedDoor2.setImmovable(true);

    }

    CreateCollisionEvents() {
        this.objects.setCollisionByProperty({ collides: true });
        this.obstacles.setCollisionByExclusion([-1]);
        this.objects.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, this.objects);
        if (this.closedDoor1) {
            this.doorCollider1 = this.physics.add.collider(this.closedDoor1, this.player, () => { 
                if(!this.keyPickup1) { 
                    this.closedDoor1.anims.play('doorAnim');
                    this.keyPickup1 = true;
                    this.physics.world.removeCollider(this.doorCollider1);
                }else{
                    game.prompt.text =  "You need the key card to open the door.";
                }
            });
        }
        if (this.closedDoor2) {
            this.doorCollider2 = this.physics.add.collider(this.closedDoor2, this.player, () => { 
                if(!this.keyPickup2) { 
                    this.closedDoor2.anims.play('doorAnim');
                    this.keyPickup2 = true;
                    this.physics.world.removeCollider(this.doorCollider2);
                }else{
                    game.prompt.text =  "You need the key card to open the door.";
                }
            });
        }

        this.acidCollider = this.physics.add.collider(this.acidpool, this.player, () => { 
            if(!this.bootPickup) { //if boots are picked
                this.physics.world.removeCollider(this.acidCollider);
            }else{
                game.prompt.text =  "You need special boots to walk on the acidpool.";
            }
        });
        
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
            this.Exit.x, this.Exit.y) < 64){
                // Make it start the next level
                this.scene.stop("HUDScene");
                this.scene.start("level2");
                this.sound.stopAll();

        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVent.x, this.tempVent.y) < 24){
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.player.x = this.tempVentOut.x;
                this.player.y = this.tempVentOut.y;
                game.prompt.text = "Keep your distance from the Alien. \n" +
                    "He can see the area highlighted in yellow"+
                    "\nHe can also hear your footsteps from a smaller range.\n" +
                    "Find your way out.";
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVentOut.x, this.tempVentOut.y) < 24){
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.player.x = this.tempVent.x;
                this.player.y = this.tempVent.y;
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.tempVent1.x, this.tempVent1.y) < 24){
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
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
            game.prompt.x = game.config.width / 2;
            game.prompt.y = 20;
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.player.x = this.tempVent1.x;
                this.player.y = this.tempVent1.y;
            }
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.bootPickup.x,  this.bootPickup.y) < 32){
            game.prompt.text =  "Dashing Boots found. \nPress SPACE when you are moving.";
            game.prompt.x = 250;
            game.prompt.y = 250;
            this.player.ready.dash = true;
            this.bootPickup.destroy();
            this.bootPickup = false;
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.keyPickup1.x,  this.keyPickup1.y) < 32){
            game.prompt.text =  "Key Card found. \nUse Keycards to open doors with F";
            this.keyPickup1.destroy();
            this.keyPickup1 = false;
        }
        if(this.distanceBetween(
            this.player.x, this.player.y,
            this.keyPickup2.x,  this.keyPickup2.y) < 32){
            game.prompt.text =  "Key Card found. \nUse Keycards to open doors with F";
            this.keyPickup2.destroy();
            this.keyPickup2 = false;
        }
    }

    distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }

    checkPause(key) {
        if (key == "Escape" && !this.paused) {
            this.paused = true;
            console.log("Paused: " + this.paused);
            this.scene.pause(currentLevel);
            this.scene.launch("pauseScene");
        } else if (key == "Escape" && this.paused) {
            this.paused = false;
            console.log("Paused: " + this.paused);
            this.scene.stop("pauseScene");
            this.scene.resume(currentLevel);
        }
    }
}