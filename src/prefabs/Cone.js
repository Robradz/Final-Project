"use strict";
class Cone extends Phaser.Physics.Arcade.Sprite{
    constructor(distance, scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.distance = distance;
        this.maskShape = scene.make.graphics({ fillStyle: { color: 0xffffff}});
        this.maskShape.x = x;
        this.maskShape.y = y;
        this.pseudoCircle = new Phaser.Geom.Circle(0, 0, distance);
        this.maskShape.fillCircleShape(this.pseudoCircle);
        //this.mask = new Phaser.Display.Masks.GeometryMask(this, this.maskShape);
        this.angle = -45;
    }

    update() {
        this.maskShape.clear();
        this.pseudoCircle = new Phaser.Geom.Circle(0, 0, this.distance);
        this.maskShape.fillCircleShape(this.pseudoCircle);
    }
}