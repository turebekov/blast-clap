import Phaser from 'phaser';
import Grid from './Grid.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
        this.rows = 10;
        this.cols = 10;
        this.tileSize = 50;
        this.colors = ['green', 'blue', 'red', 'yellow'];
        this.minGroupSize = 2;

        this.moves = 0;
        this.score = 0;
        this.maxMoves = 10;
    }

    preload() {
        this.load.image('green', 'assets/images/green-cube.png');
        this.load.image('blue', 'assets/images/blue-cube.png');
        this.load.image('red', 'assets/images/red-cube.png');
        this.load.image('yellow', 'assets/images/yellow-cube.png');
        this.load.image('score-background', 'assets/images/score-background.png');
        this.load.image('game-background', 'assets/images/game-background.png')
        this.load.image('score-ball', 'assets/images/ball.png')
    }

    create() {
        this.cameras.main.setBackgroundColor('#999fa1'); // Light blue color
        this.createContainerWithBackground();


        this.input.on('pointerdown', this.handleClick, this);

        this.addScoreTextWithImage();
    }

    createContainerWithBackground() {
        const paddingTop = 50;
        const paddingLeft = 50;

        // Создаем основной контейнер для тайлов
        this.tileContainer = this.add.container(paddingLeft, paddingTop);

        const bgImage = this.add.image(-15, -15, 'game-background');
        bgImage.setDisplaySize(this.cols * this.tileSize + 30, this.rows * this.tileSize + 30); // Scale the background image to fit the grid
        bgImage.setOrigin(0, 0);

        this.tileContainer.add(bgImage);
        this.grid = new Grid(this, this.rows, this.cols, this.colors, this.tileSize, this.tileContainer);
    }

    addScoreTextWithImage() {
        this.scoreImage = this.add.image(600, 100, 'score-background').setOrigin(0, 0); // Set the initial score image
        this.scoreImage.setDisplaySize(300, 300);

        this.scoreImageText = this.add.text(this.scoreImage.x + 150, this.scoreImage.y + 250, `${this.score}`, { fontSize: '20px', fill: '#fff' });
        this.scoreImageText.setOrigin(0.5, 0.5);

        this.movesImage = this.add.image(this.scoreImage.x + 150, this.scoreImage.y + 115, 'score-ball').setOrigin(0.5, 0.5);
        this.movesImage.setDisplaySize(170, 160);

        this.movesImageText = this.add.text(this.movesImage.x, this.movesImage.y, `${this.maxMoves - this.moves}`, { fontSize: '40px', fill: '#fff' });
        this.movesImageText.setOrigin(0.5, 0.5);
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

        if (this.moves === 10) {
            this.scene.start('LossScene');
            return;
        }
        if (this.score > 300 ) {
            this.scene.start('WinScene');
            return;
        }

        if (tilesToRemove && tilesToRemove.length >= this.minGroupSize) {
            this.moves++;
            this.score = this.score + tilesToRemove.length * 10;
            this.grid.removeTiles(tilesToRemove);
            this.updateUI();
        } else {
            console.log('Not enough tiles to remove');
        }
    }

    updateUI() {
        this.scoreImageText.setText(this.score);
        this.movesImageText.setText(this.maxMoves - this.moves);
    }
}
