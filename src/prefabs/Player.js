"use strict";
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 40;
        this.sneaking = false;
        this.state = "idle";
        this.sfx = this.scene.sound.add('footsteps',{volume: 1,loop:true});
    }

    update() {
        this.checkSneak();
        this.manageMovement();
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