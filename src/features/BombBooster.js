import {GAME_CONFIG} from '../shared/constants/config.constants';

export default class BombBooster {
    constructor(scene) {
        this.scene = scene;
        this.rows = GAME_CONFIG.ROWS;
        this.cols = GAME_CONFIG.COLS;

        this.isBombActive = false;
        this.bombRadius = 2;
    }

    activateBombBooster() {
        this.isBombActive = true;
    }

    useBombBooster(x, y) {
        this.isBombActive = false;
        const tilesToRemove = this.collectTilesToRemove(x, y);
        this.updateScoreAndRemoveTiles(tilesToRemove);
    }

    collectTilesToRemove(x, y) {
        const tilesToRemove = [];

        for (let i = -this.bombRadius; i <= this.bombRadius; i++) {
            for (let j = -this.bombRadius; j <= this.bombRadius; j++) {
                const newX = x + i;
                const newY = y + j;

                if (newX >= 0 && newX < this.cols && newY >= 0 && newY < this.rows) {
                    tilesToRemove.push({ x: newX, y: newY });
                }
            }
        }

        return tilesToRemove;
    }

    updateScoreAndRemoveTiles(tilesToRemove) {
        this.scene.moves++;
        this.scene.score += tilesToRemove.length * 10;
        this.scene.updateUI();
        this.scene.grid.removeTiles(tilesToRemove);
    }
}
