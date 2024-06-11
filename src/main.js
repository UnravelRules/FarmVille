import GameScene from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [GameScene]
};

var game = new Phaser.Game(config);