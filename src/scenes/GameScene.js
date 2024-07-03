import Player from '../entitites/player.js';
import Animal from '../entitites/animal.js';
import Fencegate from '../objects/Fencegate.js';
import Door from '../objects/Door.js';

class GameScene extends Phaser.Scene {
    constructor(){
        super({key: 'GameScene'});
        this.fencegate = null;
        this.doors = [];
        this.animals = [];
        this.isPlayerOverlappingDoors = new Map();
        this.exit = null;
        this.crops = null;

        this.uiScene = null;
        this.isPlayerOverlappingDoor = null;
    }

    create(){
        this.cameras.main.fadeIn(3500, 0, 0, 0);

        const map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('global');

        this.music = this.sound.add('music', {loop: true, volume: 0.1});
        this.music.play();

        this.marketDoorSound = this.sound.add('marketDoor', {volume: 0.2})
        this.doorSound = this.sound.add('door', {volume: 0.2})
        this.closeDoorSound = this.sound.add('closeDoor', {volume: 0.2});

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
        const decorations2 = map.createDynamicLayer("Decoration2", tileset);
        this.crops = map.createDynamicLayer("Crops", tileset);
        this.collision_layer = map.createStaticLayer("Collision", tileset).setVisible(false);
        const foreground_objects = map.createDynamicLayer("Foreground Objects",  tileset).setDepth(10); 

        const ObjectLayer = map.getObjectLayer('ObjectLayer');

        ObjectLayer.objects.forEach(object => {
            if (object.name === 'Fencegate') {
                const fencegate = new Fencegate(this, object.x + 8, object.y - 8, 'fencegateModel');
                this.add.existing(fencegate);
                this.doors.push(fencegate);
                this.isPlayerOverlappingDoors.set(fencegate, false);
            } else if (object.name === 'chickenBarnDoor') {
                const chickenBarnDoor = new Door(this, object.x + 7, object.y + 10, 'barnDoor', 'chickenBarnDoor').setDepth(10);
                this.add.existing(chickenBarnDoor);
                this.doors.push(chickenBarnDoor);
                this.isPlayerOverlappingDoors.set(chickenBarnDoor, false);
            } else if(object.name === 'bunnyBarnDoor'){
                const bunnyBarnDoor = new Door(this, object.x + 7, object.y + 10, 'barnDoor', 'bunnyBarnDoor').setDepth(10);
                this.add.existing(bunnyBarnDoor);
                this.doors.push(bunnyBarnDoor);
                this.isPlayerOverlappingDoors.set(bunnyBarnDoor, false);
            } else if(object.name === 'cowBarnDoor'){
                const cowBarnDoor = new Door(this, object.x + 7, object.y + 10, 'cowDoor', 'cowBarnDoor').setDepth(10);
                this.add.existing(cowBarnDoor);
                this.doors.push(cowBarnDoor);
                this.isPlayerOverlappingDoors.set(cowBarnDoor, false);
            } else if(object.name === 'signChicken'){
                this.add.image(object.x + 8, object.y - 8, 'signChicken').setDepth(11);
            } else if(object.name === 'signBunny'){
                this.add.image(object.x + 8, object.y - 8, 'signBunny').setDepth(11);
            } else if(object.name === 'signCow'){
                this.add.image(object.x + 8, object.y - 8, 'signCow').setDepth(11);
            }
        });

        const marketDoorObject = ObjectLayer.objects.find(object => object.name === 'marketDoor');
        this.marketDoor = new Door(this, marketDoorObject.x + 12, marketDoorObject.y + 11, 'marketDoor', "marketDoor").setDepth(10);

        const exitAreaObject = ObjectLayer.objects.find(object => object.name === 'exitArea');
        this.exitArea = this.add.zone(exitAreaObject.x, exitAreaObject.y, exitAreaObject.width, exitAreaObject.height);
        this.physics.world.enable(this.exitArea, Phaser.Physics.Arcade.STATIC_BODY);

        const chickenHouseExitObject = ObjectLayer.objects.find(object => object.name === 'chickenHouseExit');
        this.chickenExitArea = this.add.zone(chickenHouseExitObject.x, chickenHouseExitObject.y, chickenHouseExitObject.width, chickenHouseExitObject.height);
        this.physics.world.enable(this.chickenExitArea, Phaser.Physics.Arcade.STATIC_BODY);

        const bunnyHouseExitObject = ObjectLayer.objects.find(object => object.name === 'bunnyHouseExit');
        this.bunnyExitArea = this.add.zone(bunnyHouseExitObject.x, bunnyHouseExitObject.y, bunnyHouseExitObject.width, bunnyHouseExitObject.height);
        this.physics.world.enable(this.bunnyExitArea, Phaser.Physics.Arcade.STATIC_BODY);
        
        const cowHouseExitObject = ObjectLayer.objects.find(object => object.name === 'cowHouseExit');
        this.cowExitArea = this.add.zone(cowHouseExitObject.x, cowHouseExitObject.y, cowHouseExitObject.width, cowHouseExitObject.height);
        this.physics.world.enable(this.cowExitArea, Phaser.Physics.Arcade.STATIC_BODY);

        const buyAreaObject = ObjectLayer.objects.find(object => object.name === 'buyArea');
        this.buyArea = this.add.zone(buyAreaObject.x, buyAreaObject.y, buyAreaObject.width, buyAreaObject.height);
        this.physics.world.enable(this.buyArea, Phaser.Physics.Arcade.STATIC_BODY);

        const sellAreaObject = ObjectLayer.objects.find(object => object.name === 'sellArea');
        this.sellArea = this.add.zone(sellAreaObject.x, sellAreaObject.y, sellAreaObject.width, sellAreaObject.height);
        this.physics.world.enable(this.sellArea, Phaser.Physics.Arcade.STATIC_BODY);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.uiScene = this.scene.get('UI');
        this.scene.launch('UI');

        this.player = new Player(this, 145 * 16, 51 * 16, 'playerModel', this.uiScene).setDepth(5);
        this.physics.add.collider(this.player, this.collision_layer);

        this.spawnAnimals('cow', 2, 102, 64);
        this.spawnAnimals('bunny', 2, 95, 64);
        this.spawnAnimals('chicken', 2, 102, 58);
        this.spawnAnimals('chicken', 5, 144, 60);
        this.spawnAnimals('chicken', 6, 162, 61);
        this.spawnAnimals('cow', 6, 162, 64);

        // Tiere für Stallhäuser
        this.spawnAnimals('cow', 3, 17, 64);
        this.spawnAnimals('bunny', 3, 17, 90);
        this.spawnAnimals('chicken', 3, 17, 113)



        

        this.add.image(216, 2135, 'npc').setScale(0.33);
        this.add.image(328, 2135, 'npc').setScale(0.33);

        this.collision_layer.setCollision(7549, true, this.collision_layer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);
    }

    update(){
        this.player.update();
        this.checkDoorOverlap(this.marketDoor, 17, 137);
        this.checkExitOverlap(this.player, this.exitArea, 205, 69);
        this.checkExitOverlap(this.player, this.chickenExitArea, 93.5, 60);
        this.checkExitOverlap(this.player, this.bunnyExitArea, 103.5, 56);
        this.checkExitOverlap(this.player, this.cowExitArea, 112, 65);

        this.checkMarketArea();

        this.doors.forEach(door => {
            if(door.name === 'chickenBarnDoor'){
                this.checkDoorOverlap(door, 17, 119);
            } else if(door.name === 'bunnyBarnDoor'){
                this.checkDoorOverlap(door, 17, 96)
            } else if(door.name === 'cowBarnDoor'){
                this.checkDoorOverlap(door, 17, 72);
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
                this.time.delayedCall(200, () => {
                    door.closeDoor();
                    this.isPlayerOverlappingDoors.set(door, false);
                }, [], this);
            }
        });
    }



    checkDoorOverlap(door, teleportX, teleportY){
        if (this.isTransitioning) return;

        const isPlayerOverlapping = this.physics.world.overlap(this.player, door);

        if(isPlayerOverlapping && !this.isPlayerOverlappingDoor){
            this.isTransitioning = true; // Set the transition flag
            this.isPlayerOverlappingDoor = true;
            door.openDoor();
            if(door.name === 'marketDoor'){
                this.marketDoorSound.play();
            } else {
                this.doorSound.play();
            }
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
                this.closeDoorSound.play();
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

    spawnAnimals(textureKey, count, spawnX, spawnY){
        let counter = count;
        let x = spawnX;
        let y = spawnY;
        while(counter > 0){
            const animal = new Animal(this, x * 16, y * 16, textureKey).setDepth(2);
            this.animals.push(animal);

            this.physics.add.collider(this.player, animal, this.handleCollision, null, this);
            this.physics.add.collider(animal, this.collision_layer);
            this.physics.add.collider(animal, this.animals);

            counter--;
            x += 2;
        }
    }

    handleCollision(player, animal) {
        player.setVelocity(0);
        animal.setVelocity(0);
    }
}

export default GameScene;