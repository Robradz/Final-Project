"use strict";
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 3;
        this.sneaking = false;
        this.state = "idle";
    }

    update() {
        // Possible cases: 
        // Is shift down?
        checkSneak();
        manageMovement();
        // up, down, left, right
        // up+left, up+right
        // down+left, down+right
    }

    CheckSneak() {
        if (Phaser.Input.Keyboard.isDown(keyShift)) {
            this.movementSpeed = 2;
            this.sneaking = true;
        } else {
            this.movementSpeed = 3;
            this.sneaking = false;
        }
    }

    manageMovement() {
        if (Phaser.Input.Keyboard.isDown(keyW) && Phaser.Input.Keyboard.isDown(keyA)) {
            this.setVelocityX(-this.movementSpeed / Math.sqrt(2));
            this.setVelocityY(-this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        } else 
        if (Phaser.Input.Keyboard.isDown(keyW) && Phaser.Input.Keyboard.isDown(keyD)) {
            this.setVelocityX(this.movementSpeed / Math.sqrt(2));
            this.setVelocityY(-this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (Phaser.Input.Keyboard.isDown(keyS) && Phaser.Input.Keyboard.isDown(keyA)) {
            this.setVelocityX(-this.movementSpeed / Math.sqrt(2));
            this.setVelocityY(this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (Phaser.Input.Keyboard.isDown(keyS) && Phaser.Input.Keyboard.isDown(keyD)) {
            this.setVelocityX(this.movementSpeed / Math.sqrt(2));
            this.setVelocityY(this.movementSpeed / Math.sqrt(2));
            this.state = this.sneaking ? "sneaking" : "walking";
        }
        if (Phaser.Input.Keyboard.isDown(keyW)) {
            this.setVelocityX(0);
            this.setVelocityY(-this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (Phaser.Input.Keyboard.isDown(keyS)) {
            this.setVelocityX(0);
            this.setVelocityY(this.movementSpeed);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (Phaser.Input.Keyboard.isDown(keyA)) {
            this.setVelocityX(-this.movementSpeed);
            this.setVelocityY(0);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else
        if (Phaser.Input.Keyboard.isDown(keyD)) {
            this.setVelocityX(this.movementSpeed);
            this.setVelocityY(0);
            this.state = this.sneaking ? "sneaking" : "walking";
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.state = "idle";
        }
    }
}