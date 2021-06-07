"use strict";
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 40;
        this.teleportDistance = 150;
        this.sneaking = false;
        this.state = "idle";
        this.facing = "right";
        this.scene = scene;
        this.HUDScene = this.scene.scene.get('HUDScene');
        this.sfx = this.scene.sound.add('footsteps',{volume: .4,loop:true});
        window.addEventListener('keydown', (e) => this.manageAbilities(e.key));
        
        this.cooldowns = { 
            dash : parseInt(5000),
            teleport : parseInt(5000),
            invisibility : parseInt(5000), 
        }
        this.ready = {
            dash : true,
            teleport : true,
            invisibility : true, 
        }
        this.timers = {
            dash : null,
            teleport : null,
            invisibility : null
        }
        this.count = {
            dash : Infinity,
            teleport : 2,
            invisibility : 2
        }

        this.teleporterPosition = {x : x, y : y};
        this.tpSprite;

        this.scene.load.image('teleportSprite', 'assets/teleporter_abilitySprite.png');
        this.tpTexture = 'teleportSprite';

        this.create();
    }

    getTpCount() { return this.count.teleport; };
    getInCount() { return this.count.invisibility; }

    create() {
        this.sfx.stop();
        this.scene.sound.stopAll();
        this.scene.playMusic();

        // Shows a timer on the HUD for when abilities are ready
        // To be used.
        // Dash timer graphic:
        this.dashTimer = new Phaser.GameObjects.Graphics(this.HUDScene, 
            {x: 0, y: 0, add: true});
        this.HUDScene.add.existing(this.dashTimer);
        this.dashTimer.depth = 10;

        // Teleport timer graphic:
        this.invisibilityTimer = new Phaser.GameObjects.Graphics(this.HUDScene, 
            {x: 0, y: 0, add: true});
        this.HUDScene.add.existing(this.invisibilityTimer);
        this.invisibilityTimer.depth = 10;

        // Invisibility timer graphic:
        this.teleportTimer = new Phaser.GameObjects.Graphics(this.HUDScene, 
            {x: 0, y: 0, add: true});
        this.HUDScene.add.existing(this.teleportTimer);
        this.teleportTimer.depth = 10;
    }

    update() {
        // Updates the dash timer on HUD
        if (this.timers.dash != null && this.timers.dash.getProgress() < 1) {
            this.dashTimer.fillRectShape({x: 300, y: 300, width: 300, height: 300});
            this.dashTimer.fillStyle(0x0099FF, 1);
            this.dashTimer.fillRect(-228, 105,
                63 * this.timers.dash.getProgress(), 5);
            this.HUDScene.add.existing(this.dashTimer);
        }

        // Updates invisibility timer on HUD
        if (this.timers.invisibility != null && this.timers.invisibility.getProgress() < 1) {
            this.invisibilityTimer.fillRectShape({x: 300, y: 300, width:300, height: 300});
            this.invisibilityTimer.fillStyle(0x0099FF, 1);
            this.invisibilityTimer.fillRect(-228, 185,
                63 * this.timers.invisibility.getProgress(), 5);
            this.HUDScene.add.existing(this.invisibilityTimer);
        }

        // Updates teleport timer on HUD
        if (this.timers.teleport != null && this.timers.teleport.getProgress() < 1) {
            this.teleportTimer.fillRectShape({x: 300, y: 300, width:300, height: 300});
            this.teleportTimer.fillStyle(0x0099FF, 1);
            this.teleportTimer.fillRect(-228, 262,
                63 * this.timers.teleport.getProgress(), 5);
            this.HUDScene.add.existing(this.teleportTimer);
        }

        this.checkSneak();
        this.manageMovement();
    }

    dash() {
        if (this.ready.dash) {
            this.state = "dashing";
            this.ready.dash = false;
            this.timers.dash = this.scene.time.delayedCall(
                this.cooldowns.dash, 
                () => { this.ready.dash = true; }, 
                [], this.scene );
            
            this.dashTimer.destroy();
            this.dashTimer = new Phaser.GameObjects.Graphics(this.HUDScene, 
                {x: 300, y: 300, add: true});
        }
    }

    placeTeleporter() {
        if(this.count.teleport > 0) {
            this.teleporterPosition.x = this.x;
            this.teleporterPosition.y = this.y;
            if (!this.tpSprite) {
                this.tpSprite = new Phaser.GameObjects.Sprite(
                this.scene,
                this.teleporterPosition.x, 
                this.teleporterPosition.y,
                this.tpTexture);
                this.scene.add.existing(this.tpSprite);
          }
         else {
                this.tpSprite.x = this.teleporterPosition.x;
               this.tpSprite.y = this.teleporterPosition.y;
            }
        }
    }

    teleport() {
        if (this.ready.teleport && this.count.teleport > 0) {
            this.count.teleport--;
            this.x = this.teleporterPosition.x;
            this.y = this.teleporterPosition.y;
            this.state = "teleporting";
            this.ready.teleport = false;
            this.timers.teleport = this.scene.time.delayedCall(
                this.cooldowns.teleport, 
                () => { this.ready.teleport = true; }, 
                [], this.scene);

            this.teleportTimer.destroy();
            this.teleportTimer = new Phaser.GameObjects.Graphics(this.HUDScene, 
                {x: 300, y: 300, add: true});
        }
    }

    invisibility() {
        if (this.ready.invisibility && this.count.invisibility > 0) {
            this.count.invisibility--;
            this.state = "invisible";
            this.alpha = 0;
            this.ready.invisibility = false;
            this.timers.invisibility = this.scene.time.delayedCall(
                this.cooldowns.invisibility, 
                () => { 
                    this.ready.invisibility = true; 
                    this.alpha = 1}, 
                    [], this.scene );

            this.invisibilityTimer.destroy();
            this.invisibilityTimer = new Phaser.GameObjects.Graphics(this.HUDScene, 
                {x: 300, y: 300, add: true});
        }
    }

    slowTime() {
        this.scene.time.timeScale = .5;
    }

    manageAbilities(key) {
        switch(key) {
            case " ": // Space ASCII code = 32
                this.dash();
                break;
            case "q": // Q ASCII code = 81
                this.invisibility();
                break;
            case "e": // E ASCII code = 69
                this.placeTeleporter();
                break;
            case "r": // R ASCII code = 82
                this.teleport();
                break;
            case "Q": // Q ASCII code = 81
                this.invisibility();
                break;
            case "E": // E ASCII code = 69
                this.placeTeleporter();
                break;
            case "R": // R ASCII code = 82
                this.teleport();
                break;
            case "Escape":
                this.checkPause();
                break;
        }
    }

    checkSneak() {
        if (keySHIFT.isDown) {
            this.movementSpeed = 25;
            this.sneaking = true;
        } else {
            this.movementSpeed = 40;
            this.sneaking = false;
        }
    }

    stopDash() {
        this.state = "idle";
    }

    manageMovement() {
        if (this.state == "dashing") {
            this.movementSpeed = 200;

            this.scene.time.delayedCall(250, this.scene.stopDash, [], this.scene);
        }
        if (keyW.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "upLeft";
        } else 
        if (keyW.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "upRight";
        } else
        if (keyS.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "downLeft";
        } else
        if (keyS.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "downRight"
        } else
        if (keyW.isDown) {
            this.setVelocity(0, -this.movementSpeed);
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "up";
        } else
        if (keyS.isDown) {
            this.setVelocity(0, this.movementSpeed);
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "down";
        } else
        if (keyA.isDown) {
            this.setVelocity(-this.movementSpeed, 0);
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "left";
        } else
        if (keyD.isDown) {
            this.setVelocity(this.movementSpeed, 0);
            if (this.state != "dashing") {
                this.state = this.sneaking ? "sneaking" : "walking";
            }
            this.manageFootsteps();
            this.facing = "right";
        } else {
            this.setVelocity(0, 0);
            if (this.state != "dashing") {
                this.state = "idle";
            }
            this.anims.stop();
            this.sfx.stop();
        }
        
        if(this.body.velocity.y > 0 && !this.anims.isPlaying){
            this.anims.play('playerWalking');
        }
        if(this.body.velocity.y < 0 && !this.anims.isPlaying){
            this.anims.play('playerWalkingBack');
        }
        if(this.body.velocity.x > 0 && !this.anims.isPlaying){
            this.anims.play('PlayerWalkingSide');
            this.flipX = false;
        }
        if(this.body.velocity.x < 0 && !this.anims.isPlaying){
            this.anims.play('PlayerWalkingSide');
            this.flipX = true;
        }
    }

    manageFootsteps() {
        if (!this.sfx.isPlaying && !this.sneaking) {
            this.sfx.play();
        } else if (this.sneaking) {
            this.sfx.stop();
        }
    }

    checkPause() {
        console.log(this.scene);
        if(this.scene){
            if (this.scene.paused) {
                this.scene.paused = false;
                console.log("Paused: " + this.scene.paused);
                this.scene.scene.stop("pauseScene");
                this.scene.scene.resume(currentLevel);
            }else{
                this.scene.paused = true;
                console.log("Paused: " + this.scene.paused);
                this.scene.scene.pause(currentLevel);
                this.scene.scene.launch("pauseScene");
            }
        }
    }
}