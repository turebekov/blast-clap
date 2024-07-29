import Phaser from 'phaser';
import Game from './scenes/Game.js';
import LossScene from './scenes/LossScene.js'
import WinScene from './scenes/WinScene.js'

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [Game, WinScene, LossScene]
};

const game = new Phaser.Game(config);
