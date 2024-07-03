import Preloader from "./scenes/Preloader.js";
import GameScene from "./scenes/GameScene.js";
import StartScene from "./scenes/StartScene.js";
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
    scene: [Preloader, StartScene, GameScene, UI]
};

var game = new Phaser.Game(config);