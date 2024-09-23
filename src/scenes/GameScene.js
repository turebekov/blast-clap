import Phaser from 'phaser';
import Grid from '../ui/Grid.js';
import AssetLoader from '../ui/AssetLoader';
import ScoreDisplay from '../ui/ScoreDisplay';
import {GAME_CONFIG} from '../shared/constants/config.constants';
import MovesDisplay from '../ui/MovesDisplay';
import ShiftTilesDisplay from '../ui/ShiftTilesDisplay';
import BombButton from "../ui/BombButton";
import BombBooster from "../features/BombBooster";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
        this.assetLoader = new AssetLoader(this);
    }

    preload() {
        this.assetLoader.loadImages();
    }

    create() {
        this.initConfig();
        this.setBackgroundColorToMainCamera();
        this.createContainerWithBackground();

        this.initFeatures();
        this.createUIComponents();

    }

    initConfig() {
        this.rows = GAME_CONFIG.ROWS;
        this.cols = GAME_CONFIG.COLS;
        this.tileSize = GAME_CONFIG.TILE_SIZE;
        this.colors = GAME_CONFIG.COLORS;
        this.minGroupSize = GAME_CONFIG.MIN_GROUP_SIZE;
        this.maxMoves = GAME_CONFIG.MAX_MOVES;
        this.maxShiftTilesCount = GAME_CONFIG.MAX_SHIFT_TILES_COUNT;
        this.targetScore = GAME_CONFIG.TARGET_SCORE;
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
        this.input.on('pointerdown', this.handleClick, this);
    }

    handleClick(pointer) {
        if (!this.scene.isActive) return;

        const { x, y } = this.grid.getTileCoordinates.call(this, pointer);

        const tilesToRemove = this.grid.getGroupTiles(x, y);
        if (tilesToRemove && this.bombBooster.isBombActive) {
            this.bombBooster.useBombBooster(x, y);
            return;
        }
        if (tilesToRemove && tilesToRemove.length >= this.minGroupSize) {
            this.grid.processTileRemoval(tilesToRemove);
        }
    }

    initFeatures() {
        this.bombBooster = new BombBooster(this);
    }

    createUIComponents() {
        this.scoreDisplay = new ScoreDisplay(this);
        this.movesDisplay = new MovesDisplay(this, this.maxMoves);
        this.shiftTilesDisplay = new ShiftTilesDisplay(this, this.maxShiftTilesCount);
        this.bombButton = new BombButton(this);
    }

    updateUI() {
        this.scoreDisplay.update(this.score);
        this.movesDisplay.update(this.moves);
        this.shiftTilesDisplay.update(this.maxShiftTilesCount - this.shiftTilesCount);
    }
}
