class HUD extends Phaser.Scene {
    constructor() {
        super("HUDScene");
        this.returnScene;
    }

    preload() {
        this.load.image('dashSprite', 'assets/dashBoots_abilitySprite.png');
        this.load.image('invisibilitySprite', 'assets/invisCloak_sprite.png');
        this.load.image('teleportSprite', 'assets/teleporter_abilitySprite.png');
        this.load.image('abilityUI', 'assets/abilityUI.png');
    }

    create() {
        game.prompt = this.add.text(340, 20, "MOVE:WASD ECS:PAUSE/RESUME"
        +'\nPress F to go through the vent', {fill: '#0ff'});

        this.add.image(0, game.config.height, 'abilityUI').setOrigin(0,1).setScale(.75, .75);

        this.dashSprite = new Phaser.GameObjects.Sprite(this, 42, 370, 'dashSprite');
        this.dashSprite.setScale(1.5,1.5);
        this.add.text(73, 351, 'SPACE', { fontFamily: 'locust', fontSize: 9.25, color: '#000'});
        this.invisibilitySprite = new Phaser.GameObjects.Sprite(this, 40, 460, 'invisibilitySprite');
        this.invisibilitySprite.setScale(1.5,1.5);
        this.add.text(90, 430, 'Q', { fontFamily: 'locust', fontSize: 14, color: '#000'});
        this.teleportSprite = new Phaser.GameObjects.Sprite(this, 38, 525, 'teleportSprite');
        this.teleportSprite.setScale(2.5,2.5);
        this.add.text(75, 508, 'E & R', { fontFamily: 'locust', fontSize: 12, color: '#000' });

        this.add.existing(this.dashSprite);
        this.add.existing(this.invisibilitySprite);
        this.add.existing(this.teleportSprite);
        this.player = this.scene.get('Player.js');
    }
}