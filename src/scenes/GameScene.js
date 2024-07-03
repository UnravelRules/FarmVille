import Player from '../entitites/player.js';
import Animal from '../entitites/animal.js';
import Fencegate from '../objects/Fencegate.js';
import Door from '../objects/Door.js';

class GameScene extends Phaser.Scene {
    constructor(){
        super({key: 'GameScene'});
        this.fencegate = null;
        //this.isPlayerOverlappingFencegate = false;
        //this.fencegates = []; // Initialize an array to store all fencegate objects
        this.doors = [];
        //this.isPlayerOverlappingFencegates = new Map();
        this.isPlayerOverlappingDoors = new Map();
        this.exit = null;
        this.crops = null;

        this.uiScene = null;
        this.isPlayerOverlappingDoor = null;
    }

    create(){
        const map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('global');

        // Create Layers (IMPORTANT: Names have to be the same as in Tiled)
        const water = map.createDynamicLayer("Water", tileset);
        const beach = map.createDynamicLayer("Beach", tileset);
        const island = map.createDynamicLayer("Island", tileset);
        const exit = map.createDynamicLayer("Exit", tileset);
        const background = map.createDynamicLayer("Background", tileset);
        const floor = map.createDynamicLayer("Floor", tileset);
        const walls = map.createDynamicLayer("Walls", tileset);
        const edges = map.createDynamicLayer("Edges", tileset);
        const furniture = map.createDynamicLayer("Furniture", tileset).setDepth(2);
        const furniture2 = map.createDynamicLayer("Furniture2", tileset).setDepth(2);
        const farming_area = map.createDynamicLayer("Farming Area", tileset);
        const paths = map.createDynamicLayer("Paths", tileset);
        const bridges2 = map.createDynamicLayer("Bridges2", tileset);
        const bridges = map.createDynamicLayer("Bridges", tileset);
        const fences2 = map.createDynamicLayer("Fences2", tileset);
        const fences = map.createDynamicLayer("Fences", tileset);
        const houses = map.createDynamicLayer("Houses", tileset);
        const decorations = map.createDynamicLayer("Decoration", tileset);
        this.crops = map.createDynamicLayer("Crops", tileset);
        const collision_layer = map.createStaticLayer("Collision", tileset).setVisible(false);
        const foreground_objects = map.createDynamicLayer("Foreground Objects",  tileset).setDepth(10); 

        const ObjectLayer = map.getObjectLayer('ObjectLayer');

        ObjectLayer.objects.forEach(object => {
            if (object.name === 'Fencegate') {
                const fencegate = new Fencegate(this, object.x + 8, object.y - 8, 'fencegateModel');
                this.add.existing(fencegate);
                this.doors.push(fencegate);
                this.isPlayerOverlappingDoors.set(fencegate, false);
            } else if (object.name === 'barnDoor') {
                const marketDoor = new Door(this, object.x + 7, object.y + 10, 'barnDoor', 'barnDoor').setDepth(10);
                this.add.existing(marketDoor);
                this.doors.push(marketDoor);
                this.isPlayerOverlappingDoors.set(marketDoor, false);
            } else if(object.name === 'signChicken'){
                this.add.image(object.x + 8, object.y - 8, 'signChicken').setDepth(11);
            } else if(object.name === 'signBunny'){
                this.add.image(object.x + 8, object.y - 8, 'signBunny').setDepth(11);
            }
        });

        const marketDoorObject = ObjectLayer.objects.find(object => object.name === 'marketDoor');
        this.marketDoor = new Door(this, marketDoorObject.x + 12, marketDoorObject.y + 11, 'marketDoor', "marketDoor").setDepth(10);

        const exitAreaObject = ObjectLayer.objects.find(object => object.name === 'exitArea');
        this.exitArea = this.add.zone(exitAreaObject.x, exitAreaObject.y, exitAreaObject.width, exitAreaObject.height);
        this.physics.world.enable(this.exitArea, Phaser.Physics.Arcade.STATIC_BODY);

        const buyAreaObject = ObjectLayer.objects.find(object => object.name === 'buyArea');
        this.buyArea = this.add.zone(buyAreaObject.x, buyAreaObject.y, buyAreaObject.width, buyAreaObject.height);
        this.physics.world.enable(this.buyArea, Phaser.Physics.Arcade.STATIC_BODY);

        const sellAreaObject = ObjectLayer.objects.find(object => object.name === 'sellArea');
        this.sellArea = this.add.zone(sellAreaObject.x, sellAreaObject.y, sellAreaObject.width, sellAreaObject.height);
        this.physics.world.enable(this.sellArea, Phaser.Physics.Arcade.STATIC_BODY);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.uiScene = this.scene.get('UI');
        this.scene.launch('UI');

        // 2145, 800
        this.player = new Player(this, 208, 2160, 'playerModel', this.uiScene).setDepth(5);
        this.physics.add.collider(this.player, collision_layer);

        this.chicken = new Animal(this, 2145, 816, 'chicken');
        this.physics.add.collider(this.player, this.chicken, this.handlePlayerAnimalCollision, null, this);
        this.physics.add.collider(this.chicken, collision_layer);

        this.cow = new Animal(this, 104 * 16, 69 * 16, 'cow');

        this.physics.add.collider(this.player, this.cow, this.handlePlayerAnimalCollision, null, this);
        this.physics.add.collider(this.chicken, this.cow);
        this.physics.add.collider(this.cow, collision_layer);

        this.add.image(216, 2135, 'npc').setScale(0.33);
        this.add.image(328, 2135, 'npc').setScale(0.33);

        collision_layer.setCollision(7549, true, collision_layer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);
    }

    update(){
        this.player.update();
        this.checkDoorOverlap(this.marketDoor, 17, 137);
        this.checkExitOverlap(this.player, this.exitArea, 205, 69);
        this.checkMarketArea();

        this.doors.forEach(door => {
            if(door.name === 'barnDoor'){
                this.checkDoorOverlap(door, 17, 137);
            }
        })
        
        this.doors.forEach(door => {
            const isPlayerOverlapping = this.physics.world.overlap(this.player, door);
            const wasPlayerOverlapping = this.isPlayerOverlappingDoors.get(door);

            if (isPlayerOverlapping && !wasPlayerOverlapping) {
                // Player has entered the fencegate area
                door.openDoor();
                this.isPlayerOverlappingDoors.set(door, true);
            } else if (!isPlayerOverlapping && wasPlayerOverlapping) {
                // Player has left the fencegate area
                this.time.delayedCall(100, () => {
                    door.closeDoor();
                    this.isPlayerOverlappingDoors.set(door, false);
                }, [], this);
            }
        });
    }

    handlePlayerAnimalCollision(player, animal) {
        //player.setVelocity(0);
        //animal.setVelocity(0);
        player.body.reset(player.x, player.y);
    }

    checkDoorOverlap(door, teleportX, teleportY){
        if (this.isTransitioning) return;

        const isPlayerOverlapping = this.physics.world.overlap(this.player, door);

        if(isPlayerOverlapping && !this.isPlayerOverlappingDoor){
            this.isTransitioning = true; // Set the transition flag
            this.isPlayerOverlappingDoor = true;
            door.openDoor();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.teleport(this.player, teleportX, teleportY);
                this.cameras.main.fadeIn(2000, 0, 0, 0);
                this.cameras.main.once('camerafadeincomplete', () => {
                    door.closeDoor();
                    this.isPlayerOverlappingDoor = false;
                    this.isTransitioning = false;
                });
            });
            
        }
    }

    checkExitOverlap(player, exit, teleportX, teleportY){
        if (this.isTransitioning) return;

        const isPlayerOverlapping = this.physics.world.overlap(player, exit);

        if (isPlayerOverlapping) {
            this.isTransitioning = true; // Set the transition flag
            this.cameras.main.fadeOut(1000, 0, 0, 0);

            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.teleport(player, teleportX, teleportY);
                this.cameras.main.fadeIn(2000, 0, 0, 0);
                this.cameras.main.once('camerafadeincomplete', () => {
                    this.isTransitioning = false; // Reset the transition flag
                });
            });
        }
    }

    checkMarketArea(){
        const isPlayerOverlappingBuyArea = this.physics.world.overlap(this.player, this.buyArea);
        const isPlayerOverlappingSellArea = this.physics.world.overlap(this.player, this.sellArea);

        if(isPlayerOverlappingBuyArea){
            this.player.openMenu('buyArea');
        } else if (isPlayerOverlappingSellArea){
            this.player.openMenu('sellArea');
        } else if (!isPlayerOverlappingBuyArea && !isPlayerOverlappingSellArea){
            this.player.closeMenu();
        }
    }

    teleport(player, positionX, positionY){
        player.setPosition(positionX * 16, positionY * 16);
    }
}

export default GameScene;