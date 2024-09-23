import Phaser from "phaser";

export default class ShiftTile {
    constructor(scene) {
        this.scene = scene;
    }

    handleShiftClick() {
        if (this.scene.maxShiftTilesCount === this.scene.shiftTilesCount) {
            return;
        }

        this.scene.shiftTilesCount++;
        this.scene.updateUI();
        this.shuffleTileColors();
    }

    shuffleTileColors() {
        const colors = this.collectTileColors();
        Phaser.Utils.Array.Shuffle(colors);

        for (let y = 0; y < this.scene.rows; y++) {
            for (let x = 0; x < this.scene.cols; x++) {
                const color = colors.pop();
                const tile = this.scene.grid.grid[y][x];
                tile.color = color;
                tile.sprite.setTexture(color);
            }
        }
    }

    collectTileColors() {
        const colors = [];
        for (let y = 0; y < this.scene.rows; y++) {
            for (let x = 0; x < this.scene.cols; x++) {
                colors.push(this.scene.grid.grid[y][x].color);
            }
        }
        return colors;
    }

}
