import Phaser from 'phaser';

class Tile {
    constructor(scene, x, y, size, texture) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = texture;

        this.sprite = this.scene.add.sprite(this.x * this.size + this.size / 2, this.y * this.size + this.size / 2, texture);

        // Устанавливаем размер спрайта
        this.sprite.displayWidth = this.size;
        this.sprite.displayHeight = this.size;

        // Устанавливаем hitArea
        this.sprite.setInteractive();
    }
}

export default Tile;
