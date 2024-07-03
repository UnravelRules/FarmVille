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
        this.load.spritesheet('cowDoor', '../assets/images/cowDoor.png', {frameWidth: 16, frameHeight: 18});

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
        this.load.image('signCow', '../assets/images/cowSign.png');

        this.load.spritesheet('chicken', '../assets/images/animals/chicken.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('cow', '../assets/images/animals/cow.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('bunny', '../assets/images/animals/bunny.png', {frameWidth: 17, frameHeight: 17})

        this.load.audio('music', '../assets/sounds/background_music.mp3');
        this.load.audio('startscreenMusic', '../assets/sounds/startscreen_music.mp3')
        this.load.audio('harvest', '../assets/sounds/harvest_sound.mp3');
        this.load.audio('plant', '../assets/sounds/plant_sound.mp3');
        this.load.audio('walk', '../assets/sounds/walk_sound.mp3');
        this.load.audio('marketDoor', '../assets/sounds/marketDoor_sound.mp3');
        this.load.audio('door', '../assets/sounds/door_sound.mp3');
        this.load.audio('closeDoor', '../assets/sounds/closeDoor_sound.mp3');
        this.load.audio('openFencegate', '../assets/sounds/openFencegate_sound.mp3');
        this.load.audio('closeFencegate', '../assets/sounds/closeFencegate_sound.mp3');
        this.load.audio('openInventory', '../assets/sounds/openInventorySound.mp3');
        this.load.audio('closeInventory', '../assets/sounds/closeInventorySound.mp3');
        this.load.audio('clickSound', '../assets/sounds/clickSound.mp3')

        this.load.image('startScreenBackground', '../assets/images/startScreen/background_startScreen.png');
        this.load.image('farmville', '../assets/images/startScreen/farmville.png')
        this.load.image('startButton', '../assets/images/startScreen/startButton.png')
        this.load.image('erstelltVonButton', '../assets/images/startScreen/erstelltVonButton.png');
        this.load.image('fabianButton', '../assets/images/startScreen/fabianButton.png');
        this.load.image('mostafaButton', '../assets/images/startScreen/mostafaButton.png');
        this.load.image('emptyButton', '../assets/images/startScreen/emptyButton.png');
        this.load.image('githubText', '../assets/images/startScreen/github_text.png');
        this.load.image('githubLogo', '../assets/images/startScreen/github_logo.png');


        this.load.on('complete', () => {
            console.log('All assets loaded');
            this.scene.start('StartScene');
        });
    }
}

export default Preloader;