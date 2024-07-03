class StartScene extends Phaser.Scene {
    constructor(){
        super({key: 'StartScene'});
    }

    create(){
        this.backgroundImage = this.add.image(0, 0, 'startScreenBackground').setOrigin(0,0).setScale(2.5);
        this.backgroundImage.setTint(0xd3d3d3)
        this.farmville = this.add.image(700, 120, 'farmville').setScale(6);
        this.startButton = this.createButton(250, 350, 'startButton', this.startGame, 5);
        this.emptyButton = this.createButton(1150, 350, 'emptyButton', this.openProjectGithub, 5)
        this.githubLogo = this.add.image(this.emptyButton.x + 30, this.emptyButton.y - 20, 'githubLogo').setScale(0.3);
        this.githubText = this.add.image(this.emptyButton.x, this.emptyButton.y + 30, 'githubText').setScale(2);
        this.erstelltVonButton = this.add.image(700, 600, 'erstelltVonButton').setScale(3);
        this.fabianButton = this.createButton(this.erstelltVonButton.x - 450, 650, 'fabianButton', this.openFabianGithub, 2.5)
        this.mostafaButton = this.add.image(this.erstelltVonButton.x + 450, 650, 'mostafaButton').setScale(2.5);
        
        this.startscreenMusic = this.sound.add('startscreenMusic', {volume: 0.1})
        this.startscreenMusic.play();
        this.clickSound = this.sound.add('clickSound', {volume: 0.3});
    }

    createButton(x, y, texture, callback, scale){
        const button = this.add.image(x, y, texture).setInteractive();
        button.setScale(scale);

        button.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
        });

        button.on('pointerout', () => {
            this.input.setDefaultCursor('auto');
        });

        button.on('pointerup', callback, this);
        return button;
    }

    startGame(){
        this.clickSound.play();
        this.time.delayedCall(300, () => {
            this.fadeOutAndSwitchScene('GameScene');
        }, [], this);
    }

    openProjectGithub(){
        this.clickSound.play();
        this.time.delayedCall(300, () => {
            open("https://github.com/UnravelRules/farming-game");
        }, [], this);
    }

    openFabianGithub(){
        this.clickSound.play();        
        this.time.delayedCall(300, () => {
            open("https://github.com/UnravelRules");
        }, [], this);
    }

    fadeOutAndSwitchScene(nextScene) {
        let fadeDuration = 2000;
        this.cameras.main.fadeOut(fadeDuration, 0, 0, 0);
        this.tweens.add({
            targets: this.startscreenMusic,
            volume: 0,
            duration: fadeDuration,
            onComplete: () => {}
        });
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.startscreenMusic.stop();
            this.scene.start(nextScene);
        });
    }
}

export default StartScene;