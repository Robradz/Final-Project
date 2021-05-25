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
            slowTime : parseInt(5000)
        }
        this.ready = {
            dash : true,
            teleport : true,
            invisibility : true, 
            slowTime : true
        }
        this.timers = {
            dash : null,
            teleport : null,
            invisibility : null
        }

        this.teleporterPosition = {x : 0, y : 0};
        this.tpSprite;

        // temporary until a teleporter texture exists
        this.texture = texture;
    }

    update() {
        this.checkSneak();
        this.manageMovement();
    }

    dash() {
        if (this.ready.dash) {
            this.state = "dashing";
            this.ready.dash = false;
            this.scene.time.delayedCall(
                this.cooldowns.dash, 
                () => { this.ready.dash = true; }, 
                [], this.scene );
        }
    }

    placeTeleporter() {
        this.teleporterPosition.x = this.x;
        this.teleporterPosition.y = this.y;
        if (this.tpSprite) {

            this.tpSprite = this.scene.make.sprite(
                this.teleporterPosition.x, 
                this.teleporterPosition.y,
                this.texture);
        }
        console.log (this.teleporterPosition.x, 
            this.teleporterPosition.y);
    }

    teleport(){
        if (this.ready.teleport) {
            this.x = this.teleporterPosition.x;
            this.y = this.teleporterPosition.y;
        }
    }

    invisibility() {
        if (this.ready.invisibility) {
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
        if (this.state == "teleporting") { return; }
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