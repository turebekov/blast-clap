export default class AssetLoader {
    constructor(scene) {
        this.scene = scene;
    }

    loadImages() {
        this.scene.load.image('green', 'assets/images/green-cube.png');
        this.scene.load.image('blue', 'assets/images/blue-cube.png');
        this.scene.load.image('red', 'assets/images/red-cube.png');
        this.scene.load.image('yellow', 'assets/images/yellow-cube.png');
        this.scene.load.image('score-background', 'assets/images/score-background.png');
        this.scene.load.image('game-background', 'assets/images/game-background.png');
        this.scene.load.image('score-ball', 'assets/images/ball.png');
        this.scene.load.image('bomb', 'assets/images/bomb.png');
    }
}
