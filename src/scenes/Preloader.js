class Preloader extends Phaser.Scene {
    constructor(){
        super({key: 'Preloader'});
    }

    preload(){
        this.load.image('global', '../assets/tilesets/tileset.png');
        this.load.tilemapTiledJSON('map', '../assets/gameMap.json');
        this.load.spritesheet('playerModel', '../assets/images/player.png', {frameWidth: 48, frameHeight: 68});
        this.load.spritesheet('fencegateModel', '../assets/images/fencegateTexture.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('marketDoor', '../assets/images/marketDoor.png', {frameWidth: 24, frameHeight: 22});
        this.load.spritesheet('barnDoor', '../assets/images/barnDoor.png', {frameWidth: 16, frameHeight: 19});

        this.load.image('npc', '../assets/images/npc.png');

        this.load.image('ui_options', '../assets/images/ui_options.png');
        this.load.image('ui_cropSelector', '../assets/images/ui_cropSelector.png');
        this.load.image('carrotSeed', '../assets/images/seeds/carrotSeed.png');
        this.load.image('tomatoSeed', '../assets/images/seeds/tomatoSeed.png');
        this.load.image('berriesSeed', '../assets/images/seeds/berriesSeed.png');
        this.load.image('pumpkinSeed', '../assets/images/seeds/pumpkinSeed.png');
        this.load.image('cornSeed', '../assets/images/seeds/cornSeed.png');
        this.load.image('potatoSeed', '../assets/images/seeds/potatoSeed.png');

        this.load.image('einstellungen', '../assets/images/options/einstellungen.png');
        this.load.image('inventar', '../assets/images/options/inventar.png');
        this.load.image('quests', '../assets/images/options/quests.png');

        this.load.image('sell', '../assets/images/options/sell.png');

        this.load.image('inventar_ui', '../assets/images/options/inventory_ui.png');
        this.load.image('carrot', '../assets/images/harvest/carrot.png');
        this.load.image('tomato', '../assets/images/harvest/tomato.png');
        this.load.image('berries', '../assets/images/harvest/berries.png');
        this.load.image('pumpkin', '../assets/images/harvest/pumpkin.png');
        this.load.image('corn', '../assets/images/harvest/corn.png');
        this.load.image('potato', '../assets/images/harvest/potato.png');

        this.load.image('signChicken', '../assets/images/chickenSign.png');
        this.load.image('signBunny', '../assets/images/bunnySign.png');

        this.load.spritesheet('chicken', '../assets/images/animals/chicken.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('cow', '../assets/images/animals/cow.png', {frameWidth: 24, frameHeight: 24});

        this.load.on('complete', () => {
            console.log('All assets loaded');
            this.scene.start('GameScene');
        });
    }
}

export default Preloader;