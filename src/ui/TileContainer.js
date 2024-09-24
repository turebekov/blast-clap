export default class TileContainer {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.createContainerWithBackground();
    }

    createContainerWithBackground() {
        const paddingTop = 50;
        const paddingLeft = 50;

        this.container = this.scene.add.container(paddingLeft, paddingTop);
        this.addBackgroundImageToContainer()
    }

    addBackgroundImageToContainer() {
        const bgImage = this.scene.add.image(-15, -15, 'game-background');
        bgImage.setDisplaySize(this.scene.cols * this.scene.tileSize + 30, this.scene.rows * this.scene.tileSize + 30);
        bgImage.setOrigin(0, 0);

        this.container.add(bgImage);
    }
}
