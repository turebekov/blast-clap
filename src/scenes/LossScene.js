import Phaser from 'phaser';

export default class LossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LossScene' });
    }

    create() {
        this.add.text(100, 100, 'You Lose!', { fontSize: '32px', fill: '#fff' });
        this.add.text(100, 150, 'Click to Restart', { fontSize: '24px', fill: '#fff' });

        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
