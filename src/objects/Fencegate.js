class Fencegate extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.isPlayerOverlappingFencegate = false;

        this.openFencegateSound = this.scene.sound.add('openFencegate', {volume: 0.2});
        this.closeFencegateSound = this.scene.sound.add('closeFencegate', {volume: 0.2});


        this.scene.anims.create({
            key: 'open',
            frames: this.scene.anims.generateFrameNumbers('fencegateModel', { start: 0, end: 2}),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'close',
            frames: [{ key: 'fencegateModel', frame: 2 }, { key: 'fencegateModel', frame: 1 }, { key: 'fencegateModel', frame: 0 }],
            frameRate: 10,
            repeat: 0
        });
    }

    openDoor(){
        this.anims.play('open');
        this.openFencegateSound.play();
        this.lastState = true;
    }

    closeDoor(){
        this.anims.play('close');
        this.closeFencegateSound.play();
        this.lastState = false;
    }
}

export default Fencegate;
