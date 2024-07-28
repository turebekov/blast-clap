import Tile from './Tile.js';

class Grid {
    constructor(scene, rows, cols, colors, tileSize, container) {
        this.scene = scene;
        this.rows = rows;
        this.cols = cols;
        this.colors = colors;
        this.tileSize = tileSize;
        this.container = container;
        this.grid = this.createGrid();
    }

    createGrid() {
        const grid = [];

        for (let y = 0; y < this.rows; y++) {
            const row = [];

            for (let x = 0; x < this.cols; x++) {
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                const tile = new Tile(this.scene, x, y, this.tileSize, color);
                row.push(tile);
                this.container.add(tile.sprite);
            }

            grid.push(row);
        }

        return grid;
    }
}

export default Grid;
