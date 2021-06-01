class HUD extends Phaser.Scene {
    constructor() {
        super("HUDScene");
        this.returnScene;
    }

    preload() {
        this.load.image('dashSprite', 'assets/dashBoots_abilitySprite.png');
        this.load.image('invisibilitySprite', 'assets/invisCloak_sprite.png');
        this.load.image('teleportSprite', 'assets/teleporter_abilitySprite.png');
    }

    create() {
        game.prompt = this.add.text(340, 20, "MOVE:WASD ECS:PAUSE/RESUME"
        +'\nPress F to go through the vent', {fill: '#0ff'});

        this.dashSprite = new Phaser.GameObjects.Sprite(this, 75, 350, 'dashSprite');
        this.dashSprite.setScale(1.5,1.5);
        this.add.text(105, 350, 'SPACE', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.invisibilitySprite = new Phaser.GameObjects.Sprite(this, 75, 425, 'invisibilitySprite');
        this.invisibilitySprite.setScale(1.5,1.5);
        this.add.text(105, 425, '    Q  ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.teleportSprite = new Phaser.GameObjects.Sprite(this, 75, 485, 'teleportSprite');
        this.teleportSprite.setScale(2.5,2.5);
        this.add.text(105, 485, 'E & R', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        this.add.existing(this.dashSprite);
        this.add.existing(this.invisibilitySprite);
        this.add.existing(this.teleportSprite);
        this.player = this.scene.get('Player.js');
    }


    update() {

    }
}