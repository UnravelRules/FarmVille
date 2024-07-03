class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey, name) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        this.name = name;
        this.textureKey = textureKey;
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.isPlayerOverlappingFencegate = false;
        this.scene.anims.create({
            key: this.textureKey + 'open',
            frames: this.scene.anims.generateFrameNumbers(textureKey, { start: 0, end: 2}),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: this.textureKey + 'close',
            frames: [{ key: textureKey, frame: 2 }, { key: textureKey, frame: 1 }, { key: textureKey, frame: 0 }],
            frameRate: 10,
            repeat: 0
        });
    }

    openDoor(){
        this.anims.play(this.textureKey + 'open');
        this.lastState = true;
    }

    closeDoor(){
        this.anims.play(this.textureKey + 'close');
        this.lastState = false;
    }
}

export default Door;