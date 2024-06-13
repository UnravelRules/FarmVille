class Preloader extends Phaser.Scene {
    constructor(){
        super({key: 'Preloader'});
    }

    preload(){
        this.load.image('global', '../assets/tilesets/tileset.png');
        this.load.tilemapTiledJSON('map', '../assets/gameMap.json');
        this.load.spritesheet('playerModel', '../images/player.png', {frameWidth: 48, frameHeight: 68});
        this.load.spritesheet('fencegateModel', '../images/fencegateTexture.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('ui_options', '../images/ui_options.png');
        this.load.image('ui_cropSelector', '../images/ui_cropSelector.png');
        this.load.image('carrotSeed', '../images/seeds/carrotSeed.png');
        this.load.image('potatoSeed', '../images/seeds/potatoSeed.png');
        this.load.image('pumpkinSeed', '../images/seeds/pumpkinSeed.png');

        this.load.image('einstellungen', '../images/options/einstellungen.png');
        this.load.image('inventar', '../images/options/inventar.png');
        this.load.image('quests', '../images/options/quests.png');

        this.load.image('inventar_ui', '../images/options/inventory_ui.png');
        this.load.image('carrotPlaceholder', '../images/harvest/carrotPlaceholder.png');
        this.load.image('carrot', '../images/harvest/carrot.png');


        this.load.on('complete', () => {
            console.log('All assets loaded');
            this.scene.start('GameScene');
        });
    }
}

export default Preloader;