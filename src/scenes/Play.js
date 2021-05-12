class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.paused = false;
    }

    preload() {

    }

    create() {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.justDown(keyESC) && !this.paused) {
            this.paused = true;
            this.scene.pause();
            this.scene.launch("pauseScene");
        } else if (Phaser.Input.Keyboard.justDown(keyESC) && this.paused) {
            this.paused = false;
            this.scene.stop();
            this.scene.resume("playScene");
        }
    }
}