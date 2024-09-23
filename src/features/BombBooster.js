export default class BombBooster {
    constructor(scene) {
        this.scene = scene;
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

                if (newX >= 0 && newX < this.scene.cols && newY >= 0 && newY < this.scene.rows) {
                    tilesToRemove.push({ x: newX, y: newY });
                }
            }
        }

        return tilesToRemove;
    }

    updateScoreAndRemoveTiles(tilesToRemove) {
        this.scene.score += tilesToRemove.length * 10;
        this.scene.updateUI();
        this.scene.grid.removeTiles(tilesToRemove);
    }
}
