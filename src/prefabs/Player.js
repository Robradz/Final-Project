"use strict";
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 40;
        this.sneaking = false;
        this.state = "idle";
        this.facing = "right";
        this.scene = scene;
        this.sfx = this.scene.sound.add('footsteps',{volume: 1,loop:true});
        window.addEventListener('keydown', (e) => this.manageAbilities(e.key));
        this.timer = new Phaser.Time.Clock(this.scene);
    }

    update() {
        this.checkSneak();
        this.manageMovement();
    }

    dash() {
        this.state = "dashing";
    }

    teleport(){
        this.state = "teleporting";
    }

    invisibility() {
        console.log("invisible");
    }

    slowTime() {
        console.log("slowTime");
    }

    manageAbilities(key) {
        switch(key) {
            case " ": // Space ASCII code = 32
                this.dash();
                break;
            case "q": // Q ASCII code = 81
                this.teleport();
                break;
            case "e": // E ASCII code = 69
                this.invisibility();
                break;
            case "r": // R ASCII code = 82
                this.slowTime();
                break;
            case "Q": // Q ASCII code = 81
                this.teleport();
                break;
            case "E": // E ASCII code = 69
                this.invisibility();
                break;
            case "R": // R ASCII code = 82
                this.slowTime();
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
        console.log("stopDash");
    }

    manageMovement() {
        if (this.state == "dashing") {
            console.log("dashing");
            this.movementSpeed = 950;
            
            // this timer doesn't work at all...
            this.timer.delayedCall(3000, this.stopDash, [], this.scene);
        }
        if (keyW.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "upLeft";
        } else 
        if (keyW.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "upRight";
        } else
        if (keyS.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "downLeft";
        } else
        if (keyS.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "downRight"
        } else
        if (keyW.isDown) {
            this.setVelocity(0, -this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "up";
        } else
        if (keyS.isDown) {
            this.setVelocity(0, this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "down";
        } else
        if (keyA.isDown) {
            this.setVelocity(-this.movementSpeed, 0);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "left";
        } else
        if (keyD.isDown) {
            this.setVelocity(this.movementSpeed, 0);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
            this.facing = "right";
        } else {
            this.setVelocity(0, 0);
            this.state = "idle";
            this.sfx.stop();
        }
    }
}