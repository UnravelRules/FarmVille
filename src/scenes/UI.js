class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });
        this.seeds = ['carrotSeed', 'tomatoSeed', 'berriesSeed', 'pumpkinSeed', 'cornSeed', 'potatoSeed'];
        this.currentSeedIndex = 0;
        this.inventory = null;
        this.isInventoryOpen = false;
        this.items = new Map();
        this.items.set('carrot', 0);
        this.items.set('tomato', 0);
        this.items.set('berries', 0);
        this.items.set('pumpkin', 0);
        this.items.set('corn', 0);
        this.items.set('potato', 0);
        this.carrotIcon = null;
        this.carrotCount = 0;
        this.tomatoIcon = null;
        this.tomatoCount = 0;
        this.berriesIcon = null;
        this.berriesCount = 0;
        this.pumpkinIcon = null;
        this.pumpkinCount = 0;
        this.cornIcon = null;
        this.cornCount = 0;
        this.potatoIcon = null;
        this.potatoCount = 0;
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
        icon.setScale(4);

        icon.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
        });

        icon.on('pointerout', () => {
            this.input.setDefaultCursor('auto');
        });

        icon.on('pointerup', callback, this);
        return icon;
    }

    openEinstellungen(){
        console.log('Einstellungen');
    }

    openQuests(){
        console.log('Quests');
    }

    createInventar(){
        let inventory = this.add.image(530, 277, 'inventar_ui').setScale(4);
        return inventory;
    }

    openInventar(){
        if(!this.isInventoryOpen){
            this.inventory.setVisible(true);
            if(this.carrotIcon != null){
                this.carrotIcon.setVisible(true);
                this.carrotCount.setVisible(true);
            } 
            if(this.tomatoIcon != null){
                this.tomatoIcon.setVisible(true);
                this.tomatoCount.setVisible(true);
            } 
            if(this.berriesIcon != null){
                this.berriesIcon.setVisible(true);
                this.berriesCount.setVisible(true);
            } 
            if(this.pumpkinIcon != null){
                this.pumpkinIcon.setVisible(true);
                this.pumpkinCount.setVisible(true);
            } 
            if(this.cornIcon != null){
                this.cornIcon.setVisible(true);
                this.cornCount.setVisible(true);
            }
            if(this.potatoIcon != null){
                this.potatoIcon.setVisible(true);
                this.potatoCount.setVisible(true);
            }
            this.isInventoryOpen = true;
        } else if(this.isInventoryOpen){
            this.inventory.setVisible(false);
            this.isInventoryOpen = false;
            if(this.carrotIcon != null){
                this.carrotIcon.setVisible(false);
                this.carrotCount.setVisible(false);
            }
            if(this.tomatoIcon != null){
                this.tomatoIcon.setVisible(false);
                this.tomatoCount.setVisible(false);
            } 
            if(this.berriesIcon != null){
                this.berriesIcon.setVisible(false);
                this.berriesCount.setVisible(false);
            } 
            if(this.pumpkinIcon != null){
                this.pumpkinIcon.setVisible(false);
                this.pumpkinCount.setVisible(false);
            } 
            if(this.cornIcon != null){
                this.cornIcon.setVisible(false);
                this.cornCount.setVisible(false);
            } 
            if(this.potatoIcon != null){
                this.potatoIcon.setVisible(false);
                this.potatoCount.setVisible(false);
            }
        }
    }

    addItemToInventory(crop){
        if(crop === 'carrotSeed'){
            if(this.items.get('carrot') === 0){
                this.carrotIcon = this.createIcon(this.inventory.x - 352, this.inventory.y - 120, 'carrot', this.changeItems);
                this.carrotIcon.setVisible(false);
                this.items.set('carrot', this.items.get('carrot') + 1);
                this.carrotCount = this.add.text(this.carrotIcon.x + 16, this.carrotIcon.y + 16, this.items.get('carrot'));
                this.carrotCount.setVisible(false);
            } else{
                this.items.set('carrot', this.items.get('carrot') + 1);
                this.carrotCount.setText(this.items.get('carrot'));
            }
        } else if(crop === 'tomatoSeed'){
            if(this.items.get('tomato') === 0){
                this.tomatoIcon = this.createIcon(this.inventory.x - 288, this.inventory.y - 116, 'tomato', this.changeItems);
                this.tomatoIcon.setVisible(false);
                this.items.set('tomato', this.items.get('tomato') + 1);
                this.tomatoCount = this.add.text(this.tomatoIcon.x + 16, this.tomatoIcon.y + 16, this.items.get('tomato'));
                this.tomatoCount.setVisible(false);
            } else{
                this.items.set('tomato', this.items.get('tomato') + 1);
                this.tomatoCount.setText(this.items.get('tomato'));
            }
        } else if(crop === 'berriesSeed'){
            if(this.items.get('berries') === 0){
                this.berriesIcon = this.createIcon(this.inventory.x - 224, this.inventory.y - 116, 'berries', this.changeItems);
                this.berriesIcon.setVisible(false);
                this.items.set('berries', this.items.get('berries') + 1);
                this.berriesCount = this.add.text(this.berriesIcon.x + 16, this.berriesIcon.y + 16, this.items.get('berries'));
                this.berriesCount.setVisible(false);
            } else{
                this.items.set('berries', this.items.get('berries') + 1);
                this.berriesCount.setText(this.items.get('berries'));
            }
        } else if(crop === 'pumpkinSeed'){
            if(this.items.get('pumpkin') === 0){
                this.pumpkinIcon = this.createIcon(this.inventory.x - 160, this.inventory.y - 120, 'pumpkin', this.changeItems);
                this.pumpkinIcon.setVisible(false);
                this.items.set('pumpkin', this.items.get('pumpkin') + 1);
                this.pumpkinCount = this.add.text(this.pumpkinIcon.x + 16, this.pumpkinIcon.y + 16, this.items.get('pumpkin'));
                this.pumpkinCount.setVisible(false);
            } else{
                this.items.set('pumpkin', this.items.get('pumpkin') + 1);
                this.pumpkinCount.setText(this.items.get('pumpkin'));
            }
        } else if(crop === 'cornSeed'){
            if(this.items.get('corn') === 0){
                this.cornIcon = this.createIcon(this.inventory.x - 96, this.inventory.y - 120, 'corn', this.changeItems);
                this.cornIcon.setVisible(false);
                this.items.set('corn', this.items.get('corn') + 1);
                this.cornCount = this.add.text(this.cornIcon.x + 16, this.cornIcon.y + 16, this.items.get('corn'));
                this.cornCount.setVisible(false);
            } else{
                this.items.set('corn', this.items.get('corn') + 1);
                this.cornCount.setText(this.items.get('corn'));
            }
        } else if(crop === 'potatoSeed'){
            if(this.items.get('potato') === 0){
                this.potatoIcon = this.createIcon(this.inventory.x - 32, this.inventory.y - 120, 'potato', this.changeItems);
                this.potatoIcon.setVisible(false);
                this.items.set('potato', this.items.get('potato') + 1);
                this.potatoCount = this.add.text(this.potatoIcon.x + 16, this.potatoIcon.y + 16, this.items.get('potato'));
                this.potatoCount.setVisible(false);
            } else{
                this.items.set('potato', this.items.get('potato') + 1);
                this.potatoCount.setText(this.items.get('potato'));
            }
        }
    }

    changeItems(){

    }
}

export default UI;