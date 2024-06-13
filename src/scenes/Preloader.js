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
        this.load.image('tomatoSeed', '../images/seeds/tomatoSeed.png');
        this.load.image('berriesSeed', '../images/seeds/berriesSeed.png');
        this.load.image('pumpkinSeed', '../images/seeds/pumpkinSeed.png');
        this.load.image('cornSeed', '../images/seeds/cornSeed.png');
        this.load.image('potatoSeed', '../images/seeds/potatoSeed.png');

        this.load.image('einstellungen', '../images/options/einstellungen.png');
        this.load.image('inventar', '../images/options/inventar.png');
        this.load.image('quests', '../images/options/quests.png');

        this.load.image('inventar_ui', '../images/options/inventory_ui.png');
        this.load.image('carrot', '../images/harvest/carrot.png');
        this.load.image('tomato', '../images/harvest/tomato.png');
        this.load.image('berries', '../images/harvest/berries.png');
        this.load.image('pumpkin', '../images/harvest/pumpkin.png');
        this.load.image('corn', '../images/harvest/corn.png');
        this.load.image('potato', '../images/harvest/potato.png');


        this.load.on('complete', () => {
            console.log('All assets loaded');
            this.scene.start('GameScene');
        });
    }
}

export default Preloader;