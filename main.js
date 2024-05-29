import MapScene from "./src/scenes/MapScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1120,
    height: 640,
    //zoom: 4,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: MapScene
};

var game = new Phaser.Game(config);