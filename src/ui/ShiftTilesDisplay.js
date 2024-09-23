export default class ShiftTilesDisplay {
    constructor(scene, maxShiftTilesCount) {
        this.scene = scene;
        this.maxShiftTilesCount = maxShiftTilesCount;

        this.addImage();
        this.addText();
    }

    addImage() {
        this.shiftTilesImg = this.scene.add.image(700, 400, 'score-ball').setOrigin(0, 0);
        this.shiftTilesImg.setDisplaySize(100, 100);

        this.shiftTileImgHandler();
    }

    shiftTileImgHandler() {
        this.shiftTilesImg.setInteractive();
        this.shiftTilesImg.on('pointerdown', this.scene.shiftTile.handleShiftClick, this.scene.shiftTile);
    }

    addText() {
        this.shiftTilesText = this.scene.add.text(this.shiftTilesImg.x + 50, this.shiftTilesImg.y + 50, `${this.maxShiftTilesCount}`, { fontSize: '30px', fill: '#fff' });
        this.shiftTilesText.setOrigin(0.5, 0.5);
    }

    update(remainingShifts) {
        this.shiftTilesText.setText(remainingShifts);
    }
}
