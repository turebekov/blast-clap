import Phaser from 'phaser';
import Grid from './Grid.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('green', 'assets/images/green-cube.png');
        this.load.image('blue', 'assets/images/blue-cube.png');
        this.load.image('red', 'assets/images/red-cube.png');
        this.load.image('yellow', 'assets/images/yellow-cube.png');
    }

    create() {
        this.rows = 10;
        this.cols = 10;
        this.tileSize = 50;
        this.colors = ['green', 'blue', 'red', 'yellow'];
        this.minGroupSize = 2;

        this.attemptsCount = 10;
        this.score = 0;

        const paddingTop = 50;
        const paddingLeft = 50;

        // Создаем основной контейнер для тайлов
        this.tileContainer = this.add.container(paddingLeft, paddingTop);

        this.grid = new Grid(this, this.rows, this.cols, this.colors, this.tileSize, this.tileContainer);

        this.input.on('pointerdown', this.handleClick, this);
    }

    handleClick(pointer) {
        // Корректируем координаты клика с учетом отступов
        const localX = pointer.x - this.tileContainer.x;
        const localY = pointer.y - this.tileContainer.y;

        const x = Math.floor(localX / this.tileSize);
        const y = Math.floor(localY / this.tileSize);

        console.log(`Clicked tile coordinates: (${x}, ${y})`);
        console.log(`Pointer coordinates: (${pointer.x}, ${pointer.y})`);

        const tilesToRemove = this.grid.getGroupTiles(x, y);

        if (tilesToRemove.length >= this.minGroupSize) {
            this.grid.removeTiles(tilesToRemove);
        } else {
            console.log('Not enough tiles to remove');
        }
    }
}
