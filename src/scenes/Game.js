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
    }

}
