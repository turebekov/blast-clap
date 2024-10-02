import Phaser from "phaser";
import {GAME_CONFIG} from '../shared/constants/config.constants';

export default class ShiftTile {
    constructor(scene) {
        this.scene = scene;
        this.rows = GAME_CONFIG.ROWS;
        this.cols = GAME_CONFIG.COLS;
        this.maxShiftTilesCount = GAME_CONFIG.MAX_SHIFT_TILES_COUNT;
    }

    handleShiftClick() {
        if (this.maxShiftTilesCount === this.scene.shiftTilesCount) {
            return;
        }

        this.scene.shiftTilesCount++;
        this.scene.updateUI();
        this.shuffleTileColors();
    }

    shuffleTileColors() {
        const colors = this.collectTileColors();
        Phaser.Utils.Array.Shuffle(colors);

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const color = colors.pop();
                const tile = this.scene.grid.grid[y][x];
                tile.color = color;
                tile.sprite.setTexture(color);
            }
        }
    }

    collectTileColors() {
        const colors = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                colors.push(this.scene.grid.grid[y][x].color);
            }
        }
        return colors;
    }

}
