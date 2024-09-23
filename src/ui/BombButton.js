export default class BombButton {
    constructor(scene) {
        this.scene = scene;
        this.addBombButton();
    }

    addBombButton() {
        this.bombButton = this.scene.add.image(850, 450, 'bomb').setInteractive();
        this.bombButton.on('pointerdown', this.scene.bombBooster.activateBombBooster, this.scene.bombBooster);
    }
}
