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
        this.sfx = this.scene.sound.add('footsteps',{volume: 1,loop:true});
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

        this.teleporterPosition = {x : 0, y : 0};
        this.tpSprite;

        // temporary until a teleporter texture exists
        this.texture = texture;

        this.create();
        //this.teleportTimer = this.add.graphics({x: 50, y: game.config.width/2});
        //this.invisibilityTimer = this.add.graphics({x: 50, y: game.config.width/2+100});
    }

    create() {
        this.sfx.stop();
        this.scene.sound.stopAll();
        this.scene.playMusic();
        this.dashTimer = new Phaser.GameObjects.Graphics(this.scene, 
            {x: 300, y: 300, add: true});
        this.scene.add.existing(this.dashTimer);
        // this.dashTimer = this.scene.add.graphics({
        //     x: game.config.height/2, 
        //     y: game.config.width/2,
        //     add: true});
        this.dashTimer.depth = 10;
        console.log(this.dashTimer);
    }

    update() {
        if (this.timers.dash != null && this.timers.dash.getProgress() < 1) {
            this.dashTimer.fillRectShape({x: 300, y: 300, width:300, height: 300});
            this.dashTimer.fillStyle(0xFF0000, 1);
            // this.dashTimer.fillRect(50, game.config.width/2-100,
            //     50, 50 * this.timers.dash.getProgress());
            this.dashTimer.fillRect(300, 300, 300, 300);
            this.scene.add.existing(this.dashTimer);
        }
        // if (this.timers.teleport != null ) {
        //     console.log(this.timers.teleport.getProgress());
        // }
        // if (this.timers.invisibility != null ) {
        //     console.log(this.timers.invisibility.getProgress());
        // }
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
            console.log(this.dashTimer);
        }
    }

    placeTeleporter() {
        this.teleporterPosition.x = this.x;
        this.teleporterPosition.y = this.y;
        if (!this.tpSprite) {
            this.tpSprite = new Phaser.GameObjects.Sprite(
                this.scene,
                this.teleporterPosition.x, 
                this.teleporterPosition.y,
                this.texture);
            this.scene.add.existing(this.tpSprite);
        }
        else {
            this.tpSprite.x = this.teleporterPosition.x;
            this.tpSprite.y = this.teleporterPosition.y;
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
            this.sfx.stop();
        }
    }

    manageFootsteps() {
        if (!this.sfx.isPlaying && !this.sneaking) {
            this.sfx.play();
        } else if (this.sneaking) {
            this.sfx.stop();
        }
    }
}