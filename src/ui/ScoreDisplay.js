export default class ScoreDisplay {
    constructor(scene) {
        this.scene = scene;

        this.init();
    }

    init() {
        this.addScoreImage();
        this.addScoreText();
    }

    addScoreImage() {
        this.scoreImage = this.scene.add.image(600, 100, 'score-background').setOrigin(0, 0);
        this.scoreImage.setDisplaySize(300, 300);
    }

    addScoreText() {
        this.scoreText = this.scene.add.text(750, 350, '0', { fontSize: '20px', fill: '#fff' });
        this.scoreText.setOrigin(0.5, 0.5);
    }

    update(score) {
        this.scoreText.setText(score);
    }
}
