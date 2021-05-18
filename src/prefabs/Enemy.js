"use strict";
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.detectionRadius = 30;
        this.detectionDistance = 60;
        this.movementSpeed = 30;
        this.facing = "right";
        this.player = scene.player;
        this.scene = scene;
        this.movementStep = 1;
        this.isTrailing = false;
        this.lastPositionX = x;
        this.lastPositionY = y;
    }

    update() {
        if(this.path && !this.isTrailing){
            this.scene.physics.moveTo(this, 
                this.path.x + this.getDestination().x,
                this.path.y + this.getDestination().y,
                this.movementSpeed);
            if(Math.abs(this.path.x + this.getDestination().x - this.x) < 1
              && Math.abs(this.path.y + this.getDestination().y - this.y) < 1){
                this.setVelocity(0, 0);
                this.movementStep++;
                this.movementStep = this.movementStep % 
                        (Object.getOwnPropertyNames(this.path.polygon).length - 1);
            }
        }

        if(this.isTrailing){
            if(Math.abs(this.player.x - this.x) > 2){
                this.setVelocity(0, 0);
                this.scene.physics.moveToObject(this, this.player, this.movementSpeed);
                this.body.setVelocityY(0);
            }else if(Math.abs(this.player.y - this.y) > 2){
                this.setVelocity(0, 0);
                this.scene.physics.moveToObject(this, this.player, this.movementSpeed);
                this.body.setVelocityX(0);
            }
        }

        this.updateDirection();
        if (this.player.state != "sneaking" &&
            this.player.state != "idle") {
            this.checkRadius();
        }
        this.checkCone();
    }

    detectionAngle(ex, ey, px, py) {
        return Math.acos(py-ey / px-ex);
    }

    checkCone() {
        if (this.distanceBetween(this.x, this.y, this.player.x, this.player.y) 
            > this.detectionDistance) { return; }

        if (this.facing == "right" && this.player.x > this.x &&
            Math.abs(this.player.y - this.y) < 
            Math.abs(this.player.x - this.x)) {
            console.warn("Player caught by cone facing right");
            game.prompt.text = "the alien got attracted";
            this.isTrailing = true;
        } else if (this.facing == "left" && this.player.x < this.x &&
            Math.abs(this.player.y - this.y) < 
            Math.abs(this.player.x - this.x)) {
            console.warn("Player caught by cone facing left");
            game.prompt.text = "the alien got attracted";
            this.isTrailing = true;
        } else if (this.facing == "up" && this.player.y < this.y &&
            Math.abs(this.player.y - this.y) > 
            Math.abs(this.player.x - this.x)) {
            console.warn("Player caught by cone facing up");
            game.prompt.text = "the alien got attracted";
            this.isTrailing = true;
        } else if (this.facing == "down" && this.player.y > this.y &&
            Math.abs(this.player.y - this.y) > 
            Math.abs(this.player.x - this.x)) {
            console.warn("Player caught by cone facing down");
            game.prompt.text = "the alien got attracted";
            this.isTrailing = true;
        }
    }

    distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }

    checkRadius() {
        if (this.distanceBetween(this.player.x, this.player.y, this.x, this.y) 
                                < this.detectionRadius) {
            console.warn("Player detected by radius");
            game.prompt.text = "the alien got attracted";
            this.isTrailing = true;
        }
    }

    updateDirection() {
        if (this.x > this.lastPositionX && 
            Math.abs(this.x - this.lastPositionX) > 
            Math.abs(this.y - this.lastPositionY)) {
            this.facing = "right";
        } else if (this.x < this.lastPositionX && 
            Math.abs(this.x - this.lastPositionX) > 
            Math.abs(this.y - this.lastPositionY)) {
            this.facing = "left";
        } else if (this.y < this.lastPositionY) {
            this.facing = "up";
        } else if (this.y > this.lastPositionY) {
            this.facing = "down";
        }
        this.lastPositionX = this.x;
        this.lastPositionY = this.y;
    }

    getDestination() {
        return this.path.polygon[this.movementStep];
    }
}