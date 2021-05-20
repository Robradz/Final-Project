"use strict";
class Cone extends Phaser.Physics.Arcade.Sprite{
    constructor(distance, scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.distance = distance;
        this.visableDistance = distance;
        this.maskShape = scene.make.graphics({ fillStyle: { color: 0xffffff } });
        this.pseudoCircle = new Phaser.Geom.Circle(0, 0, distance);
        this.maskShapes.fillCircleShape(this.pseudoCircle);
        this.mask = new Phaser.Display.Masks.GeometryMask(this, this.maskShape);

    }
}