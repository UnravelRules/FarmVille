import Player from '../entitites/player.js';
import Door from '../objects/Door.js';
import Fencegate from '../objects/Fencegate.js';

class GameScene extends Phaser.Scene {
    constructor(){
        super({key: 'GameScene'});
        this.fencegate = null;
        this.isPlayerOverlappingFencegate = false;
    }

    preload(){
        this.load.image('global', '../assets/tilesets/tileset.png');
        this.load.tilemapTiledJSON('map', '../assets/gameMap.json');
        this.load.spritesheet('playerModel', '../images/player.png', {frameWidth: 48, frameHeight: 68});
        this.load.spritesheet('doorModel', '../images/doorTexture.png', {frameWidth: 48, frameHeight: 21});
        this.load.spritesheet('fencegateModel', '../images/fencegateTexture.png', {frameWidth: 16, frameHeight: 16});
    }

    create(){
        const map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('global');

        // Create Layers (IMPORTANT: Names have to be the same as in Tiled)
        const water = map.createDynamicLayer("Water", tileset);
        const beach = map.createDynamicLayer("Beach", tileset);
        const island_layer1 = map.createDynamicLayer("Island First Layer", tileset);
        const island_layer2 = map.createDynamicLayer("Island Second Layer", tileset);
        const exit = map.createDynamicLayer("Exit", tileset);
        const background = map.createDynamicLayer("Background", tileset);
        const floor = map.createDynamicLayer("Floor", tileset);
        const walls = map.createDynamicLayer("Walls", tileset);
        const edges = map.createDynamicLayer("Edges", tileset);
        const paths = map.createDynamicLayer("Paths", tileset);
        const garden = map.createDynamicLayer("Garden", tileset);
        const farming_area = map.createDynamicLayer("Farming Area", tileset);
        const houses = map.createDynamicLayer("Houses", tileset);
        const crops = map.createDynamicLayer("Crops", tileset).setVisible(false);;
        const collision_layer = map.createStaticLayer("Collision", tileset).setVisible(false);
        const foreground_objects = map.createDynamicLayer("Foreground Objects",  tileset).setDepth(10);

        const doorLayer = map.getObjectLayer('Doors');
        // const doorTopObject = doorLayer.objects.find(object => object.name === 'doorTop');
        // const doorBottomObject = doorLayer.objects.find(object => object.name === 'doorBottom');
        const fencegateObject = doorLayer.objects.find(object => object.name === 'Fencegate');
        
        // const doorTop = new Door(this, doorTopObject.x, doorTopObject.y, 'doorModel');
        // const doorBottom = new Door(this, doorBottomObject.x, doorBottomObject.y, 'doorModel');
        this.fencegate = new Fencegate(this, fencegateObject.x + 8, fencegateObject.y - 8, 'fencegateModel');
        this.add.existing(this.fencegate);


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.player = new Player(this, 1552, 1200, 'playerModel');

        this.physics.add.collider(this.player, collision_layer);
        collision_layer.setCollision(7549, true, collision_layer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);
    }

    update(){
        this.player.move();

        const isPlayerOverlapping = this.physics.world.overlap(this.player, this.fencegate);

        if (isPlayerOverlapping && !this.isPlayerOverlappingFencegate) {
            // Player has entered the fencegate area
            this.fencegate.openDoor();
            this.isPlayerOverlappingFencegate = true;
        } else if (!isPlayerOverlapping && this.isPlayerOverlappingFencegate) {
            // Player has left the fencegate area
            this.time.delayedCall(100, () => {
                this.fencegate.closeDoor();
                this.isPlayerOverlappingFencegate = false;
            }, [], this);
        }
    }


}

export default GameScene;