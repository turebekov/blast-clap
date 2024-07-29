import Phaser from 'phaser';

export default class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        this.add.text(100, 100, 'You Win!', { fontSize: '32px', fill: '#fff' });
        this.add.text(100, 150, 'Click to Restart', { fontSize: '24px', fill: '#fff' });

        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
