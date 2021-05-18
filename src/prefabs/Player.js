"use strict";
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 40;
        this.sneaking = false;
        this.state = "idle";
        this.facing = "right";
        this.sfx = this.scene.sound.add('footsteps',{volume: 1,loop:true});
        window.addEventListener('keydown', (e) => this.manageAbilities(e.key));
    }

    update() {
        this.checkSneak();
        this.manageMovement();
    }

    dash() {
        console.log("dash");
    }

    teleport(){
        console.log("tp");
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

    manageMovement() {
        if (keyW.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else 
        if (keyW.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else
        if (keyS.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else
        if (keyS.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else
        if (keyW.isDown) {
            this.setVelocity(0, -this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else
        if (keyS.isDown) {
            this.setVelocity(0, this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else
        if (keyA.isDown) {
            this.setVelocity(-this.movementSpeed, 0);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else
        if (keyD.isDown) {
            this.setVelocity(this.movementSpeed, 0);
            this.state = this.sneaking ? "sneaking" : "walking";
            if(!this.sfx.isPlaying && !this.sneaking){
                this.sfx.play()
            }
        } else {
            this.setVelocity(0, 0);
            this.state = "idle";
            this.sfx.stop();
        }
    }
}