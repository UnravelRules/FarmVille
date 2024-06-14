import Player from '../entitites/player.js';
import Door from '../objects/Door.js';
import Fencegate from '../objects/Fencegate.js';
import UI from './UI.js';

class GameScene extends Phaser.Scene {
    constructor(){
        super({key: 'GameScene'});
        this.fencegate = null;
        //this.isPlayerOverlappingFencegate = false;
        this.fencegates = []; // Initialize an array to store all fencegate objects
        this.isPlayerOverlappingFencegates = new Map();
        this.crops = null;
        this.uiScene = null;
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
        const fences = map.createDynamicLayer("Fences", tileset);
        const decorations = map.createDynamicLayer("Decoration", tileset);
        const farming_area = map.createDynamicLayer("Farming Area", tileset);
        const houses = map.createDynamicLayer("Houses", tileset);
        this.crops = map.createDynamicLayer("Crops", tileset);
        const collision_layer = map.createStaticLayer("Collision", tileset).setVisible(false);
        const foreground_objects = map.createDynamicLayer("Foreground Objects",  tileset).setDepth(10);

        const doorLayer = map.getObjectLayer('Doors');
        // const doorTopObject = doorLayer.objects.find(object => object.name === 'doorTop');
        // const doorBottomObject = doorLayer.objects.find(object => object.name === 'doorBottom');
        
        // const doorTop = new Door(this, doorTopObject.x, doorTopObject.y, 'doorModel');
        // const doorBottom = new Door(this, doorBottomObject.x, doorBottomObject.y, 'doorModel');
        doorLayer.objects.forEach(object => {
            if (object.name === 'Fencegate') {
                const fencegate = new Fencegate(this, object.x + 8, object.y - 8, 'fencegateModel');
                this.add.existing(fencegate);
                this.fencegates.push(fencegate);
                this.isPlayerOverlappingFencegates.set(fencegate, false);
            }
        });


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.uiScene = this.scene.get('UI');
        this.scene.launch('UI');

        this.player = new Player(this, 1552, 1200, 'playerModel', this.uiScene);

        this.physics.add.collider(this.player, collision_layer);
        collision_layer.setCollision(7549, true, collision_layer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);

    }

    update(){
        this.player.update();

        this.fencegates.forEach(fencegate => {
            const isPlayerOverlapping = this.physics.world.overlap(this.player, fencegate);
            const wasPlayerOverlapping = this.isPlayerOverlappingFencegates.get(fencegate);

            if (isPlayerOverlapping && !wasPlayerOverlapping) {
                // Player has entered the fencegate area
                fencegate.openDoor();
                this.isPlayerOverlappingFencegates.set(fencegate, true);
            } else if (!isPlayerOverlapping && wasPlayerOverlapping) {
                // Player has left the fencegate area
                this.time.delayedCall(100, () => {
                    fencegate.closeDoor();
                    this.isPlayerOverlappingFencegates.set(fencegate, false);
                }, [], this);
            }
        });
    }
}

export default GameScene;