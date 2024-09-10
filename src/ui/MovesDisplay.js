
export default class MovesDisplay {
    constructor(scene, maxMoves) {
        this.scene = scene;
        this.maxMoves = maxMoves;


        this.addMovesImage();
        this.addMovesText();
    }

    addMovesImage() {
        this.movesImage = this.scene.add.image(750, 215, 'score-ball').setOrigin(0.5, 0.5);
        this.movesImage.setDisplaySize(170, 160);
    }

    addMovesText() {
        this.movesText = this.scene.add.text(this.movesImage.x, this.movesImage.y, `${this.maxMoves}`, { fontSize: '40px', fill: '#fff' });
        this.movesText.setOrigin(0.5, 0.5);
    }

    update(moves) {
        this.movesText.setText(this.maxMoves - moves);
    }
}
