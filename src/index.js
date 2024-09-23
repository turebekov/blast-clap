import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';
import LossScene from './scenes/LossScene.js'
import WinScene from './scenes/WinScene.js'

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [GameScene, WinScene, LossScene]
};

const game = new Phaser.Game(config);
