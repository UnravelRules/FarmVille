import Preloader from "./scenes/Preloader.js";
import GameScene from "./scenes/GameScene.js";
import UI from "./scenes/UI.js";

const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Preloader, GameScene, UI]
};

var game = new Phaser.Game(config);