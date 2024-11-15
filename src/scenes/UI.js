class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });
        this.seeds = ['carrotSeed', 'tomatoSeed', 'berriesSeed', 'pumpkinSeed', 'cornSeed', 'potatoSeed'];
        this.currentSeedIndex = 0;
        this.inventory = null;
        this.isInventoryOpen = false;
        this.items = new Map([
            ['carrot', 0],
            ['tomato', 0],
            ['berries', 0],
            ['pumpkin', 0],
            ['corn', 0],
            ['potato', 0]
        ]);
        this.player = null;
        this.isInventoryOpenedManually = false;
        this.sellMenuOpen = false;
    }

    create() {
        this.cameras.main.fadeIn(3500, 0, 0, 0);
        this.openInventorySound = this.sound.add('openInventory', {volume: 0.3}).setRate(2);
        this.closeInventorySound = this.sound.add('closeInventory' , {volume: 0.3}).setRate(2);

        this.ui_options = this.add.image(150, 36, 'ui_options').setScale(3.5);

        this.createIcon(this.ui_options.x + 73.5, this.ui_options.y - 5, 'einstellungen', this.openEinstellungen);
        this.inventoryIcon = this.createIcon(this.ui_options.x - 0.5, this.ui_options.y - 5, 'inventar', this.manageInventar);
        this.createIcon(this.ui_options.x - 73.5, this.ui_options.y - 5, 'quests', this.openQuests);

        this.ui_cropSelector = this.add.image(1300, 740, 'ui_cropSelector').setScale(3.5);

        this.currentSeedImage = this.add.image(this.ui_cropSelector.x, this.ui_cropSelector.y, this.seeds[this.currentSeedIndex]).setScale(4);

        this.inventory = this.add.image(530, 277, 'inventar_ui').setScale(4);
        this.inventory.setVisible(false);

        this.moneyCount = 0
        this.moneyText = this.add.text(this.inventory.x - 352, this.inventory.y + 100).setFontSize(40).setFontFamily("Arial").setVisible(false);
        this.moneyText.setText(this.moneyCount + '€');

        this.sellOption = this.add.image(1130, 277, 'sell').setScale(4);
        this.sellOption.setVisible(false);

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff0000);
            gameObject.startDragRight = pointer.rightButtonDown();
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            if (!this.isValidDropArea(gameObject)) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            } else if(this.sellMenuOpen) {
                this.sellAllItems(gameObject);
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            } else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
        this.createIconsAndTexts();
    }

    createIconsAndTexts(){
        // ALLE ICONS ERSTELLEN
        this.carrotIcon = this.createIcon(this.inventory.x - 352, this.inventory.y - 120, 'carrot', this.changeItems);
        this.carrotIcon.setVisible(false);
        this.input.setDraggable(this.carrotIcon);

        this.tomatoIcon = this.createIcon(this.inventory.x - 288, this.inventory.y - 116, 'tomato', this.changeItems);
        this.tomatoIcon.setVisible(false);
        this.input.setDraggable(this.tomatoIcon);

        this.berriesIcon = this.createIcon(this.inventory.x - 224, this.inventory.y - 116, 'berries', this.changeItems);
        this.berriesIcon.setVisible(false);
        this.input.setDraggable(this.berriesIcon);

        this.pumpkinIcon = this.createIcon(this.inventory.x - 160, this.inventory.y - 120, 'pumpkin', this.changeItems);
        this.pumpkinIcon.setVisible(false);
        this.input.setDraggable(this.pumpkinIcon);

        this.cornIcon = this.createIcon(this.inventory.x - 96, this.inventory.y - 120, 'corn', this.changeItems);
        this.cornIcon.setVisible(false);
        this.input.setDraggable(this.cornIcon);

        this.potatoIcon = this.createIcon(this.inventory.x - 32, this.inventory.y - 120, 'potato', this.changeItems);
        this.potatoIcon.setVisible(false);
        this.input.setDraggable(this.potatoIcon);

        // ALLE TEXTE ERSTELLEN
        this.carrotCount = this.add.text(this.carrotIcon.x + 16, this.carrotIcon.y + 16, this.items.get('carrot'));
        this.carrotCount.setVisible(false);

        this.tomatoCount = this.add.text(this.tomatoIcon.x + 16, this.tomatoIcon.y + 16, this.items.get('tomato'));
        this.tomatoCount.setVisible(false);

        this.berriesCount = this.add.text(this.berriesIcon.x + 16, this.berriesIcon.y + 16, this.items.get('berries'));
        this.berriesCount.setVisible(false);

        this.pumpkinCount = this.add.text(this.pumpkinIcon.x + 16, this.pumpkinIcon.y + 16, this.items.get('pumpkin'));
        this.pumpkinCount.setVisible(false);

        this.cornCount = this.add.text(this.cornIcon.x + 16, this.cornIcon.y + 16, this.items.get('corn'));
        this.cornCount.setVisible(false);

        this.potatoCount = this.add.text(this.potatoIcon.x + 16, this.potatoIcon.y + 16, this.items.get('potato'));
        this.potatoCount.setVisible(false);
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

    manageInventar(){
        if(!this.isInventoryOpen){
            this.isInventoryOpenedManually = true;
            this.openInventar();
        } else{
            this.closeInventory();
        }
    }

    openInventar(reload){
        if(!this.isInventoryOpen){
            if(!reload){
                this.openInventorySound.play();
            }
            this.inventory.setVisible(true);
            if(this.carrotCount.text != 0){
                this.carrotIcon.setVisible(true);
                this.carrotCount.setVisible(true);
            } 
            if(this.tomatoCount.text != 0){
                this.tomatoIcon.setVisible(true);
                this.tomatoCount.setVisible(true);
            } 
            if(this.berriesCount.text != 0){
                this.berriesIcon.setVisible(true);
                this.berriesCount.setVisible(true);
            } 
            if(this.pumpkinCount.text != 0){
                this.pumpkinIcon.setVisible(true);
                this.pumpkinCount.setVisible(true);
            } 
            if(this.cornCount.text != 0){
                this.cornIcon.setVisible(true);
                this.cornCount.setVisible(true);
            }
            if(this.potatoCount.text != 0){
                this.potatoIcon.setVisible(true);
                this.potatoCount.setVisible(true);
            }
            this.moneyText.setVisible(true);
            this.isInventoryOpen = true;
        }
    }

    closeInventory(reload){
        if(this.isInventoryOpen){
            if(!reload){
                this.closeInventorySound.play();
            }
            this.inventory.setVisible(false);
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
            this.moneyText.setVisible(false);
            this.isInventoryOpen = false;
        }
    }

    addItemToInventory(crop){
        if(crop === 'carrotSeed'){
            this.items.set('carrot', this.items.get('carrot') + 1);
            this.updateInventory();
        } else if(crop === 'tomatoSeed'){
            this.items.set('tomato', this.items.get('tomato') + 1);
            this.updateInventory();
        } else if(crop === 'berriesSeed'){
            this.items.set('berries', this.items.get('berries') + 1);
            this.updateInventory();
        } else if(crop === 'pumpkinSeed'){
            this.items.set('pumpkin', this.items.get('pumpkin') + 1);
            this.updateInventory();
        } else if(crop === 'cornSeed'){
            this.items.set('corn', this.items.get('corn') + 1);
            this.updateInventory();
        } else if(crop === 'potatoSeed'){
            this.items.set('potato', this.items.get('potato') + 1);
            this.updateInventory();
        }
    }

    changeItems(){}

    openBuyMenu(){
    }

    openSellMenu(){
        this.openInventar();
        this.sellOption.setVisible(true);
        this.isInventoryOpenedManually = false;
        this.inventoryIcon.disableInteractive();
        this.sellMenuOpen = true;
    }

    closeMenu(){
        if(!this.isInventoryOpenedManually){
            this.closeInventory();
            this.sellOption.setVisible(false);
            this.inventoryIcon.setInteractive();
            this.sellMenuOpen = false;
        }
    }

    isValidDropArea(object){
        const sellOptionCoords = this.sellOption.getBounds();
        if(sellOptionCoords.contains(object.x, object.y)){
            return true;
        } else {
            return false;
        }
    }

    sellItem(gameObject){
        const crop = gameObject.texture.key;
        this.items.set(crop, this.items.get(crop) - 1);
        this.moneyCount += 100;
        this.updateInventory();
    }

    sellAllItems(gameObject){
        const crop = gameObject.texture.key;
        const itemCount = this.items.get(crop);
        this.items.set(crop, 0);
        this.moneyCount += 100 * itemCount;
        this.updateInventory();
    }

    updateInventory(){
        for(const [key, value] of this.items){
            if(value > 0){
                if(key === 'carrot'){
                    this.carrotCount.setText(value);
                } else if(key === 'tomato'){
                    this.tomatoCount.setText(value);
                } else if(key === 'berries'){
                    this.berriesCount.setText(value);
                } else if(key === 'pumpkin'){
                    this.pumpkinCount.setText(value);
                } else if(key === 'corn'){
                    this.cornCount.setText(value);
                } else if(key === 'potato'){
                    this.potatoCount.setText(value);
                }
                this.moneyText.setText(this.moneyCount + '€');
                if(this.isInventoryOpen){
                    this.closeInventory(1);
                    this.openInventar(1);
                }
            } else if(value === 0){
                if(key === 'carrot'){
                    this.carrotCount.setText(value);
                    this.carrotIcon.setVisible(false);
                    this.carrotCount.setVisible(false);
                } else if(key === 'tomato'){
                    this.tomatoCount.setText(value);
                    this.tomatoIcon.setVisible(false);
                    this.tomatoCount.setVisible(false);
                } else if(key === 'berries'){
                    this.berriesCount.setText(value);
                    this.berriesIcon.setVisible(false);
                    this.berriesCount.setVisible(false);
                } else if(key === 'pumpkin'){
                    this.pumpkinCount.setText(value);
                    this.pumpkinIcon.setVisible(false);
                    this.pumpkinCount.setVisible(false);
                } else if(key === 'corn'){
                    this.cornCount.setText(value);
                    this.cornIcon.setVisible(false);
                    this.cornCount.setVisible(false);
                } else if(key === 'potato'){
                    this.potatoCount.setText(value);
                    this.potatoIcon.setVisible(false);
                    this.potatoCount.setVisible(false);
                }
                this.moneyText.setText(this.moneyCount + '€');
                if(this.isInventoryOpen){
                    this.closeInventory(1);
                    this.openInventar(1);
                }
            }
        }
    }
}

export default UI;