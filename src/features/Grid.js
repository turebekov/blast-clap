import Tile from './Tile.js';
import Phaser from "phaser";

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

    checkTileOnGrid(positionY, positionX) {
        const tileArray = this.grid[positionY];
        if (!tileArray) {
            return;
        }
        if (!tileArray[positionX]) {
            return;
        }
        return tileArray[positionX];
    }

    getGroupTiles(x, y) {
        const tilesToRemove = [];
        const tile = this.checkTileOnGrid(y, x);

        if (!tile) {
            return;
        }

        this.recursiveTileCheck(x, y, tile.color, tilesToRemove);

        return tilesToRemove;
    }

    recursiveTileCheck(x, y, color, tilesToRemove) {
        if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) {
            return;
        }

        const tile = this.grid[y][x];

        if (!tile || tile.color !== color || tilesToRemove.some(t => t.x === x && t.y === y)) {
            return;
        }

        tilesToRemove.push({ x, y });

        this.recursiveTileCheck(x + 1, y, color, tilesToRemove);
        this.recursiveTileCheck(x - 1, y, color, tilesToRemove);
        this.recursiveTileCheck(x, y + 1, color, tilesToRemove);
        this.recursiveTileCheck(x, y - 1, color, tilesToRemove);
    }

    removeTiles(tiles) {
        tiles.forEach(tile => {
            const { x, y } = tile;
            this.grid[y][x].remove();
            this.grid[y][x] = null;
        });

        this.scene.time.delayedCall(1, () => this.fillEmptySpaces());
    }

    fillEmptySpaces() {
        this.isAnimating = true;

        const tweens = [];

        for (let x = 0; x < this.cols; x++) {
            const emptySpace = this.processEmptySpacesInColumn(x);
            const columnTweens = this.createNewTilesForEmptySpace(emptySpace, x);
            tweens.push(...columnTweens);
        }

        Promise.all(tweens.map(t => {
            if (t && typeof t.setCallback === 'function') {
                return new Promise(resolve => t.setCallback('onComplete', resolve));
            } else {
                return Promise.resolve(); // Игнорируем неопределённые твины
            }
        }))
            .then(() => {
                this.isAnimating = false;
            });
    }

    processEmptySpacesInColumn(x) {
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

        return emptySpace;
    }

    createNewTilesForEmptySpace(emptySpace, x) {
        const tweens = [];
        for (let i = 0; i < emptySpace; i++) {
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const newTile = new Tile(this.scene, x, i - emptySpace, this.tileSize, color);
            this.grid[i][x] = newTile;
            this.container.add(newTile.sprite);

            const tween = this.scene.tweens.add({
                targets: newTile.sprite,
                y: newTile.sprite.y + emptySpace * this.tileSize,
                duration: 500,
                ease: 'Power2'
            });

            tweens.push(tween);
        }
        return tweens;
    }

    getTileCoordinates(pointer) {
        const localX = pointer.x - this.container.x;
        const localY = pointer.y - this.container.y;
        const x = Math.floor(localX / this.tileSize);
        const y = Math.floor(localY / this.tileSize);
        return { x, y };
    }

    processTileRemoval(tilesToRemove) {
        this.removeTiles(tilesToRemove);
        this.scene.moves++;
        this.scene.score += tilesToRemove.length * 10;
        this.scene.updateUI();
        this.scene.checkGameEndConditions();
    }

}

export default Grid;
