"use strict";
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 40;
        this.sneaking = false;
        this.state = "idle";
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
        } else 
        if (keyW.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            -this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (keyS.isDown && keyA.isDown) {
            this.setVelocity(-this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (keyS.isDown && keyD.isDown) {
            this.setVelocity(this.movementSpeed / Math.sqrt(2), 
                            this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (keyW.isDown) {
            this.setVelocity(0, -this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (keyS.isDown) {
            this.setVelocity(0, this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (keyA.isDown) {
            this.setVelocity(-this.movementSpeed, 0);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (keyD.isDown) {
            this.setVelocity(this.movementSpeed, 0);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else {
            this.setVelocity(0, 0);
            this.state = "idle";
        }
    }
}