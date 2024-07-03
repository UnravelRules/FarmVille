import Crop from '../entitites/Crop.js'
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, uiScene){
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.isPlayerOverlappingFarmingArea = false;
        this.uiScene = uiScene;
        this.currentSeed = 'carrotSeed';
        this.seeds = new Map();
        this.seeds.set('carrotSeed', 5049);
        this.seeds.set('tomatoSeed', 5197);
        this.seeds.set('berriesSeed', 5345);
        this.seeds.set('pumpkinSeed', 5493);
        this.seeds.set('cornSeed', 5641);
        this.seeds.set('potatoSeed', 5789);

        this.walkSound = this.scene.sound.add('walk', {volume: 0.1});
        this.plantSound = this.scene.sound.add('plant', {volume: 0.2})
        this.harvestSound = this.scene.sound.add('harvest', {volume: 0.2})

        this.setSize(24, 32);
        this.setScale(0.3);
        //this.setCollideWorldBounds(true);
        
        this.velocity = 100;
        
        this.lastDirection = 'down';

        this.createAnimations(scene);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.cursors = scene.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            interact:Phaser.Input.Keyboard.KeyCodes.E,
            previousSeed: Phaser.Input.Keyboard.KeyCodes.LEFT,
            nextSeed: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this.prevX = x;
        this.prevY = y;
        this.isMoving = false;
    }

    createAnimations(scene){
        scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers('playerModel', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
    
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('playerModel', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        })
    
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('playerModel', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        })
    
        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('playerModel', {start: 12, end: 15}),
            frameRate: 10,
            repeat: -1
        })
    
        scene.anims.create({
            key: 'turnLeft',
            frames: [{key: 'playerModel', frame: 4}],
            frameRate: 20
        })

        scene.anims.create({
            key: 'turnRight',
            frames: [{key: 'playerModel', frame: 9}],
            frameRate: 20
        })

        scene.anims.create({
            key: 'turnUp',
            frames: [{key: 'playerModel', frame: 12}],
            frameRate: 20
        })

        scene.anims.create({
            key: 'turnDown',
            frames: [{key: 'playerModel', frame: 0}],
            frameRate: 20
        })
    }

    move(){
        if(this.cursors.left.isDown){
            this.setVelocityX(-this.velocity);
            this.setVelocityY(0);
            this.anims.play('left', true);
            this.lastDirection = 'turnLeft';
            this.isMoving = true;
        } else if(this.cursors.right.isDown){
            this.setVelocityX(this.velocity);
            this.setVelocityY(0);
            this.anims.play('right', true);
            this.lastDirection = 'turnRight';
            this.isMoving = true;
        } else if(this.cursors.up.isDown){
            this.setVelocityY(-this.velocity);
            this.setVelocityX(0);
            this.anims.play('up', true);
            this.lastDirection = 'turnUp';
            this.isMoving = true;
        } else if(this.cursors.down.isDown){
            this.setVelocityY(this.velocity);
            this.setVelocityX(0);
            this.anims.play('down', true);
            this.lastDirection = 'turnDown';
            this.isMoving = true;
        } else{
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.anims.play(this.lastDirection)
            this.isMoving = false;
        }
        
        if(this.isMoving){
            if(!this.walkSound.isPlaying){
                this.walkSound.play();
            }
        } else {
            this.walkSound.pause();
        }
    }

    plant(){
        if(this.isPlayerOverlappingFarmingArea && Phaser.Input.Keyboard.JustDown(this.cursors.interact)){
            const playerTileX = this.scene.crops.worldToTileX(this.x);
            const playerTileY = this.scene.crops.worldToTileY(this.y);

            const tile = this.scene.crops.getTileAt(playerTileX, playerTileY);
            if(!tile.properties.isCropPlanted){
                this.plantSound.play();
                tile.properties.isCropPlanted = true;
                tile.properties.crop = this.currentSeed;
                new Crop(this.scene, tile, this.seeds.get(this.currentSeed));

            } else if(tile.properties.growthStage === 5){
                //console.log(tile.properties.crop);
                this.uiScene.addItemToInventory(tile.properties.crop);
                tile.index = 7550;
                tile.properties.isCropPlanted = false;
                tile.properties.growthStage = 0;
                this.harvestSound.play();
            }
        } 
    }

    openMenu(area){
        const keyDown = Phaser.Input.Keyboard.JustDown(this.cursors.interact)
        if(keyDown && area === 'buyArea'){
            //console.log(area)
            this.uiScene.openBuyMenu();
        } else if(keyDown && area === 'sellArea'){
            //console.log(area)
            this.uiScene.openSellMenu();
        }
    }

    closeMenu(){
        this.uiScene.closeMenu();
    }


    playerOnFarmingArea(){
        const playerTileX = this.scene.crops.worldToTileX(this.x);
        const playerTileY = this.scene.crops.worldToTileY(this.y);

        const tile = this.scene.crops.getTileAt(playerTileX, playerTileY);

        if(tile && tile.layer.name === 'Crops' && !this.isPlayerOverlappingFarmingArea){
            //console.log("Jetzt kann gefarmt werden")
            this.isPlayerOverlappingFarmingArea = true;
        } else if((!tile || tile.layer.name !== 'Crops') && this.isPlayerOverlappingFarmingArea){
            //console.log("Jetzt kann nicht mehr gefarmt werden")
            this.isPlayerOverlappingFarmingArea = false;
        }
    }

    showCoordinates(){
        const currX = this.x;
        const currY = this.y;

        if (currX !== this.prevX || currY !== this.prevY) {
            console.log(Math.round(currX / 16) + " " + Math.round(currY / 16));
        
            this.prevX = currX;
            this.prevY = currY;
        }
    }

    switchSeeds(){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.previousSeed)) {
            this.currentSeed = this.uiScene.previousSeed();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.nextSeed)) {
            this.currentSeed = this.uiScene.nextSeed();
        }
    }

    update(){
        this.move();
        this.playerOnFarmingArea();
        this.plant();
        this.switchSeeds();
        //this.showCoordinates();
    }
}

export default Player;