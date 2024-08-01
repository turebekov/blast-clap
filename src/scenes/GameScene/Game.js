import Phaser from 'phaser';
import Grid from './Grid.js';
import {GAME_CONFIG} from './config.constants';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('green', 'assets/images/green-cube.png');
        this.load.image('blue', 'assets/images/blue-cube.png');
        this.load.image('red', 'assets/images/red-cube.png');
        this.load.image('yellow', 'assets/images/yellow-cube.png');
        this.load.image('score-background', 'assets/images/score-background.png');
        this.load.image('game-background', 'assets/images/game-background.png');
        this.load.image('score-ball', 'assets/images/ball.png');
        this.load.image('bomb', 'assets/images/bomb.png');
    }

    create() {
        this.initConfig();
        this.setBackgroundColorToMainCamera();
        this.createContainerWithBackground();
        this.addScoreTextWithImage();
        this.addShiftTilesContainer();
        this.addBombButton();
    }

    initConfig() {
        const { ROWS, COLS, TILE_SIZE, COLORS, MIN_GROUP_SIZE, MAX_MOVES, MAX_SHIFT_TILES_COUNT, TARGET_SCORE } = GAME_CONFIG;
        this.rows = ROWS;
        this.cols = COLS;
        this.tileSize = TILE_SIZE;
        this.colors = COLORS;
        this.minGroupSize = MIN_GROUP_SIZE;
        this.maxMoves = MAX_MOVES;
        this.maxShiftTilesCount = MAX_SHIFT_TILES_COUNT;
        this.targetScore = TARGET_SCORE;
        this.isActive = true;

        this.moves = 0;
        this.score = 0;
        this.shiftTilesCount = 0;
    }

    setBackgroundColorToMainCamera() {
        this.cameras.main.setBackgroundColor('#999fa1');
    }

    createContainerWithBackground() {
        const paddingTop = 50;
        const paddingLeft = 50;

        this.tileContainer = this.add.container(paddingLeft, paddingTop);

        const bgImage = this.add.image(-15, -15, 'game-background');
        bgImage.setDisplaySize(this.cols * this.tileSize + 30, this.rows * this.tileSize + 30);
        bgImage.setOrigin(0, 0);

        this.tileContainer.add(bgImage);
        this.grid = new Grid(this, this.rows, this.cols, this.colors, this.tileSize, this.tileContainer);
        this.input.on('pointerdown', this.grid.handleClick, this);
    }

    addScoreTextWithImage() {
        this.scoreImage = this.add.image(600, 100, 'score-background').setOrigin(0, 0);
        this.scoreImage.setDisplaySize(300, 300);

        this.scoreImageText = this.add.text(this.scoreImage.x + 150, this.scoreImage.y + 250, `${this.score}`, { fontSize: '20px', fill: '#fff' });
        this.scoreImageText.setOrigin(0.5, 0.5);

        this.movesImage = this.add.image(this.scoreImage.x + 150, this.scoreImage.y + 115, 'score-ball').setOrigin(0.5, 0.5);
        this.movesImage.setDisplaySize(170, 160);

        this.movesImageText = this.add.text(this.movesImage.x, this.movesImage.y, `${this.maxMoves - this.moves}`, { fontSize: '40px', fill: '#fff' });
        this.movesImageText.setOrigin(0.5, 0.5);
    }

    addShiftTilesContainer() {
        this.shiftTilesImg = this.add.image(700, 400, 'score-ball').setOrigin(0, 0);
        this.shiftTilesImg.setDisplaySize(100, 100);

        this.shiftTilesImgText = this.add.text(this.shiftTilesImg.x + 50, this.shiftTilesImg.y + 50, `${this.maxShiftTilesCount}`, { fontSize: '30px', fill: '#fff' });
        this.shiftTilesImgText.setOrigin(0.5, 0.5);

        this.shiftTilesImg.setInteractive();
        this.shiftTilesImg.on('pointerdown', this.grid.handleShiftClick, this);
    }

    addBombButton() {
        this.bombButton = this.add.image(850, 450, 'bomb').setInteractive();
        this.bombButton.on('pointerdown', this.grid.activateBombBooster, this);
    }

    updateUI() {
        this.scoreImageText.setText(this.score);
        this.movesImageText.setText(this.maxMoves - this.moves);
        this.shiftTilesImgText.setText(this.maxShiftTilesCount - this.shiftTilesCount);
    }
}
