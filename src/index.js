import Phaser from 'phaser';
import Game from './scenes/Game.js';
import Score from './scenes/Score.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
