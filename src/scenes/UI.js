class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });
        this.seeds = ['carrotSeed', 'potatoSeed', 'pumpkinSeed'];
        this.currentSeedIndex = 0;
        this.inventory = null;
        this.isInventoryOpen = false;
    }

    create() {
        // Create UI elements
        this.ui_options = this.add.image(150, 36, 'ui_options').setScale(3.5);

        this.createIcon(this.ui_options.x + 73.5, this.ui_options.y - 5, 'einstellungen', this.openEinstellungen);
        this.createIcon(this.ui_options.x - 0.5, this.ui_options.y - 5, 'inventar', this.openInventar);
        this.createIcon(this.ui_options.x - 73.5, this.ui_options.y - 5, 'quests', this.openQuests);

        this.ui_cropSelector = this.add.image(1300, 740, 'ui_cropSelector').setScale(3.5);

        this.currentSeedImage = this.add.image(this.ui_cropSelector.x, this.ui_cropSelector.y, this.seeds[this.currentSeedIndex]).setScale(4);

        this.inventory = this.createInventar();
        this.inventory.setVisible(false);
    }

    previousSeed() {
        this.currentSeedIndex = (this.currentSeedIndex - 1 + this.seeds.length) % this.seeds.length;
        this.currentSeedImage.setTexture(this.seeds[this.currentSeedIndex]);
        return this.seeds[this.currentSeedIndex];
    }

    nextSeed() {
        this.currentSeedIndex = (this.currentSeedIndex + 1) % this.seeds.length;
        this.currentSeedImage.setTexture(this.seeds[this.currentSeedIndex]);
        return this.seeds[this.currentSeedIndex];
    }

    createIcon(x, y, texture, callback){
        const icon = this.add.image(x, y, texture).setInteractive();
        icon.setScale(3.8);

        icon.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
        });

        icon.on('pointerout', () => {
            this.input.setDefaultCursor('auto');
        });

        icon.on('pointerup', callback, this);
    }

    openEinstellungen(){
        console.log('Einstellungen');
    }

    openQuests(){
        console.log('Quests');
    }

    createInventar(){
        let inventory = this.add.image(530, 277, 'inventar_ui').setScale(4);
        this.add.image(inventory.x, inventory.y, 'carrotPlaceholder');
        return inventory;

    }

    openInventar(){
        if(!this.isInventoryOpen){
            this.inventory.setVisible(true);
            this.isInventoryOpen = true;
        } else if(this.isInventoryOpen){
            this.inventory.setVisible(false);
            this.isInventoryOpen = false;
        }
    }
}

export default UI;