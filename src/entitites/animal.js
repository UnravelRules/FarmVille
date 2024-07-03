class Animal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.textureKey = textureKey;
        this.direction = 0;
        this.lastDirection = textureKey + '_down';
        this.moveSpeed = 20; // Speed of movement
        this.moveDuration = this.randomIntFromInterval(2000, 5000); // Duration to move in one direction (ms)
        this.idleDuration = this.randomIntFromInterval(2000, 9000); // Duration to stay idle (ms)
        this.isMoving = false;

        this.body.setImmovable(true); // Make the animal immovable on collision

        this.createAnimations(scene);
        this.startMovementCycle();
    }

    createAnimations(scene) {
        scene.anims.create({
            key: this.textureKey + '_down',
            frames: scene.anims.generateFrameNumbers(this.textureKey, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: this.textureKey + '_up',
            frames: scene.anims.generateFrameNumbers(this.textureKey, { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: this.textureKey + '_right',
            frames: scene.anims.generateFrameNumbers(this.textureKey, { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: this.textureKey + '_left',
            frames: scene.anims.generateFrameNumbers(this.textureKey, { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: this.textureKey + '_turnLeft',
            frames: [{ key: this.textureKey, frame: 12 }],
            frameRate: 20
        });

        scene.anims.create({
            key: this.textureKey + '_turnRight',
            frames: [{ key: this.textureKey, frame: 8 }],
            frameRate: 20
        });

        scene.anims.create({
            key: this.textureKey + '_turnUp',
            frames: [{ key: this.textureKey, frame: 4 }],
            frameRate: 20
        });

        scene.anims.create({
            key: this.textureKey + '_turnDown',
            frames: [{ key: this.textureKey, frame: 0 }],
            frameRate: 20
        });
    }

    startMovementCycle() {
        this.scene.time.addEvent({
            delay: this.idleDuration,
            callback: this.move,
            callbackScope: this,
            loop: true
        });
    }

    move() {
        if (!this.isMoving) {
            this.isMoving = true;
            this.direction = Math.floor(Math.random() * 4 + 1);
            this.scene.time.delayedCall(this.moveDuration, () => {
                this.anims.play(this.lastDirection);
                this.setVelocity(0);
                this.isMoving = false;
            }, [], this);

            switch (this.direction) {
                case 1:
                    this.setVelocityY(-this.moveSpeed);
                    this.setVelocityX(0);
                    this.anims.play(this.textureKey + '_up', true);
                    this.lastDirection = this.textureKey + '_turnUp';
                    break;
                case 2:
                    this.setVelocityX(this.moveSpeed);
                    this.setVelocityY(0);
                    this.anims.play(this.textureKey + '_right', true);
                    this.lastDirection = this.textureKey + '_turnRight';
                    break;
                case 3:
                    this.setVelocityY(this.moveSpeed);
                    this.setVelocityX(0);
                    this.anims.play(this.textureKey + '_down', true);
                    this.lastDirection = this.textureKey + '_turnDown';
                    break;
                case 4:
                    this.setVelocityX(-this.moveSpeed);
                    this.setVelocityY(0);
                    this.anims.play(this.textureKey + '_left', true);
                    this.lastDirection = this.textureKey + '_turnLeft';
                    break;
            }
        }
    }

    randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default Animal;