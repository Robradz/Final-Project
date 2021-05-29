class Cone extends Phaser.Physics.Arcade.Sprite{
    constructor(distance, scene, x, y, texture, frame, player, type) {
        super(scene, x, y, texture, frame);
        this.player = player;
        // Types: invisibility and teleport. 
        // When Collided with, this type should be used to increment
        // how many teleports or invisibility uses the player has.
        this.type;
    }
}