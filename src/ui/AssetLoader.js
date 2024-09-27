import greenCube from '../assets/images/tile/green-cube.png';
import blueCube from '../assets/images/tile/blue-cube.png';
import redCube from '../assets/images/tile/red-cube.png';
import yellowCube from '../assets/images/tile/yellow-cube.png';
import scoreBackground from '../assets/images/score-background.png';
import gameBackground from '../assets/images/game-background.png';
import ballIcon from '../assets/images/ball.png';
import bombIcon from '../assets/images/bomb.png';

export default class AssetLoader {
    constructor(scene) {
        this.scene = scene;
    }

    loadImages() {
        this.scene.load.image('green', greenCube);
        this.scene.load.image('blue', blueCube);
        this.scene.load.image('red', redCube);
        this.scene.load.image('yellow', yellowCube);
        this.scene.load.image('score-background', scoreBackground);
        this.scene.load.image('game-background', gameBackground);
        this.scene.load.image('score-ball', ballIcon);
        this.scene.load.image('bomb', bombIcon);
    }
}
