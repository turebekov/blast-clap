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

    getGroupTiles(x, y) {
        const tilesToCheck = [{ x, y }];
        const tilesToRemove = [];
        const color = this.grid[y][x].color;

        while (tilesToCheck.length > 0) {
            const { x, y } = tilesToCheck.pop();

            if (x >= 0 && x < this.cols && y >= 0 && y < this.rows && this.grid[y][x] && this.grid[y][x].color === color && !tilesToRemove.some(t => t.x === x && t.y === y)) {
                tilesToRemove.push({ x, y });
                tilesToCheck.push({ x: x + 1, y });
                tilesToCheck.push({ x: x - 1, y });
                tilesToCheck.push({ x, y: y + 1 });
                tilesToCheck.push({ x, y: y - 1 });
            }
        }

        return tilesToRemove;
    }

    removeTiles(tiles) {
        tiles.forEach(tile => {
            const { x, y } = tile;
            this.grid[y][x].remove();
            this.grid[y][x] = null;
        });

        this.scene.time.delayedCall(500, () => this.fillEmptySpaces());
    }

    fillEmptySpaces() {
        for (let x = 0; x < this.cols; x++) {
            let emptySpace = 0;

            for (let y = this.rows - 1; y >= 0; y--) {
                if (this.grid[y][x] === null) {
                    emptySpace++;
                } else if (emptySpace > 0) {
                    const tile = this.grid[y][x];
                    this.grid[y][x] = null;
                    this.grid[y + emptySpace][x] = tile;

                    this.scene.tweens.add({
                        targets: tile.sprite,
                        y: tile.sprite.y + emptySpace * this.tileSize,
                        duration: 500,
                        ease: 'Power2'
                    });

                    tile.y += emptySpace;
                }
            }

            for (let i = 0; i < emptySpace; i++) {
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                const newTile = new Tile(this.scene, x, i - emptySpace, this.tileSize, color);
                this.grid[i][x] = newTile;
                this.container.add(newTile.sprite);

                this.scene.tweens.add({
                    targets: newTile.sprite,
                    y: newTile.sprite.y + emptySpace * this.tileSize,
                    duration: 500,
                    ease: 'Power2'
                });
            }
        }
    }
}

export default Grid;
