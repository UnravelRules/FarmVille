class Preloader extends Phaser.Scene {
    constructor(){
        super({key: 'Preloader'});
    }

    preload(){
        this.load.spritesheet('playerModel', '../images/player.png', {frameWidth: 48, frameHeight: 68});
    }

    create(){
        this.scene.start('GameScene');
    }

    update(){
    }
}

export default Preloader;