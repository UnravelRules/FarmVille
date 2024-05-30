class InteriorScene extends Phaser.Scene{
    constructor(){
        super({key: 'InteriorScene'});
        this.player = null;
        this.cursors = null;
        this.lastDirection = 'down';
    }

    preload(){
        this.load.image('interior', 'assets/tilesets/interior.png');
        this.load.tilemapTiledJSON('interiorMap', 'assets/interior.json');
        this.load.spritesheet('playerModel', 'images/player.png', {frameWidth: 48, frameHeight: 68});
    }

    create(){
        const map = this.make.tilemap({key: 'interiorMap', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('interior', 'interior');

        const background = map.createStaticLayer("Background", tileset);
        const walls = map.createStaticLayer("Walls", tileset);
        const ground = map.createStaticLayer("Ground", tileset);
        const interior = map.createStaticLayer("Interior", tileset);
        const furniture = map.createStaticLayer("Furniture", tileset);

        const collisionlayer = map.createStaticLayer("Collision", tileset).setVisible(false);

        this.player = this.physics.add.sprite(20, 50, 'playerModel');
        this.player.setSize(32, 32);
        this.player.setScale(0.33);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionlayer);
        collisionlayer.setCollision(76, true, collisionlayer);

        this.createAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, 112, 112);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(4);

        this.input.keyboard.on('keydown_L', this.exitInterior, this);
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

    createAnimations(){
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
    }

    exitInterior(event){
        this.scene.start('MapScene');
    }
}

export default InteriorScene;