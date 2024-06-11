class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(16, 16);
        this.setScale(0.3);
        this.setCollideWorldBounds(true);
        
        this.velocity = 100;
        
        this.lastDirection = 'down';

        this.createAnimations(scene);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.cursors = scene.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
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

    move (){
        if(this.cursors.left.isDown){
            this.setVelocityX(-this.velocity);
            this.setVelocityY(0);
            this.anims.play('left', true);
            this.lastDirection = 'turnLeft';
        } else if(this.cursors.right.isDown){
            this.setVelocityX(this.velocity);
            this.setVelocityY(0);
            this.anims.play('right', true);
            this.lastDirection = 'turnRight';
        } else if(this.cursors.up.isDown){
            this.setVelocityY(-this.velocity);
            this.setVelocityX(0);
            this.anims.play('up', true);
            this.lastDirection = 'turnUp';
        } else if(this.cursors.down.isDown){
            this.setVelocityY(this.velocity);
            this.setVelocityX(0);
            this.anims.play('down', true);
            this.lastDirection = 'turnDown';
        } else{
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.anims.play(this.lastDirection)
        }
    }
}

export default Player;