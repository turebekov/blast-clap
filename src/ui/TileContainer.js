import {GAME_CONFIG} from '../shared/constants/config.constants';

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
        bgImage.setDisplaySize(GAME_CONFIG.COLS * GAME_CONFIG.TILE_SIZE + 30, GAME_CONFIG.ROWS * GAME_CONFIG.TILE_SIZE + 30);
        bgImage.setOrigin(0, 0);

        this.container.add(bgImage);
    }
}
