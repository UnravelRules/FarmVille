class MapScene extends Phaser.Scene {
    constructor(){
        super({key: 'MapScene'});
        this.player = null;
        this.cursors = null;
        this.lastDirection = 'down';
    }
    

    preload (){
        this.load.image('tileset', 'assets/tilesets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/gameMap.json');
        this.load.spritesheet('playerModel', 'images/player.png', {frameWidth: 48, frameHeight: 68});
    }

    create (){
        const map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('tileset', 'tileset');

        const water = map.createStaticLayer("Water", tileset);
        const island = map.createStaticLayer("Island", tileset);
        const grass = map.createStaticLayer("Grass", tileset);
        const trees = map.createStaticLayer("Trees", tileset);
        const decorations = map.createStaticLayer("Decoration", tileset);
        const paths = map.createStaticLayer("Paths", tileset);
        const fields = map.createStaticLayer("Fields", tileset);
        const fences = map.createStaticLayer("Fences", tileset);
        const house = map.createStaticLayer("House", tileset);
        const door = map.createStaticLayer("Door", tileset);
        const collisionlayer = map.createStaticLayer("Collisions", tileset, 0, 0).setVisible(false);
        const farmingArea = map.createStaticLayer("Farming Zones", tileset, 0, 0).setVisible(false);
        const foregroundObjects = map.createStaticLayer("Foreground Objects", tileset, 0, 0).setDepth(10);

    
        this.player = this.physics.add.sprite(520, 450, 'playerModel');
        this.player.setSize(16, 16);
        this.player.setScale(0.33);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionlayer);
        collisionlayer.setCollision(64, true, collisionlayer);


    
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('playerModel', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerModel', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        })
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerModel', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        })
    
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('playerModel', {start: 12, end: 15}),
            frameRate: 10,
            repeat: -1
        })
    
        this.anims.create({
            key: 'turnLeft',
            frames: [{key: 'playerModel', frame: 4}],
            frameRate: 20
        })

        this.anims.create({
            key: 'turnRight',
            frames: [{key: 'playerModel', frame: 9}],
            frameRate: 20
        })

        this.anims.create({
            key: 'turnUp',
            frames: [{key: 'playerModel', frame: 12}],
            frameRate: 20
        })

        this.anims.create({
            key: 'turnDown',
            frames: [{key: 'playerModel', frame: 0}],
            frameRate: 20
        })
    
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (){
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-100);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
            this.lastDirection = 'turnLeft';
        } else if(this.cursors.right.isDown){
            this.player.setVelocityX(100);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
            this.lastDirection = 'turnRight';
        } else if(this.cursors.up.isDown){
            this.player.setVelocityY(-100);
            this.player.setVelocityX(0);
            this.player.anims.play('up', true);
            this.lastDirection = 'turnUp';
        } else if(this.cursors.down.isDown){
            this.player.setVelocityY(100);
            this.player.setVelocityX(0);
            this.player.anims.play('down', true);
            this.lastDirection = 'turnDown';
        } else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play(this.lastDirection)
        }
    }
}

export default MapScene;