import Phaser from 'phaser';
import Grid from '../features/Grid.js';
import AssetLoader from '../ui/AssetLoader';
import ScoreDisplay from '../ui/ScoreDisplay';
import {GAME_CONFIG} from '../shared/constants/config.constants';
import MovesDisplay from '../ui/MovesDisplay';
import ShiftTilesDisplay from '../ui/ShiftTilesDisplay';
import BombButton from "../ui/BombButton";
import BombBooster from "../features/BombBooster";
import ShiftTile from "../features/ShiftTile";
import TileContainer from "../ui/TileContainer";

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

        this.createTileContainer();
        this.initFeatures();
        this.createUIComponents();
    }

    createTileContainer() {
        this.tileContainer = new TileContainer(this);
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

        this.moves = 0;
        this.score = 0;
        this.shiftTilesCount = 0;
    }

    setBackgroundColorToMainCamera() {
        this.cameras.main.setBackgroundColor('#999fa1');
    }

    checkGameEndConditions() {
        if (this.moves >= this.maxMoves) {
            this.scene.start('LossScene');
        } else if (this.score >= this.targetScore) {
            this.scene.start('WinScene');
        }
    }

    initFeatures() {
        this.bombBooster = new BombBooster(this);
        this.shiftTile = new ShiftTile(this);
        this.grid = new Grid(this, this.rows, this.cols, this.colors, this.tileSize, this.tileContainer.container);
        this.initPointerListener();
    }

    initPointerListener() {
        this.input.on('pointerdown', this.handleClick, this);
    }

    handleClick(pointer) {
        if (this.grid.isAnimating) return;

        const { x, y } = this.grid.getTileCoordinates(pointer);

        const tilesToRemove = this.grid.getGroupTiles(x, y);
        if (tilesToRemove && this.bombBooster.isBombActive) {
            this.bombBooster.useBombBooster(x, y);
            return;
        }
        if (tilesToRemove && tilesToRemove.length >= this.minGroupSize) {
            this.grid.removeTiles(tilesToRemove);
            this.processTileRemoval(tilesToRemove);
        }
    }

    processTileRemoval(tilesToRemove) {
        this.moves++;
        this.score += tilesToRemove.length * 10;
        this.updateUI();
        this.checkGameEndConditions();
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
