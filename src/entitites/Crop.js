class Crops {
    constructor(scene, tile, tileIndex) {
        this.scene = scene;
        this.tile = tile;
        this.tileIndex = tileIndex;
        this.tile.properties.growthStage = 0;
        this.tile.index = this.tileIndex;

        this.growCrops();
    }

    growCrops() {
        setTimeout(() => {
            //console.log("Growing crops...");
            this.tile.index += 1;
            this.tile.properties.growthStage += 1;
            this.scene.crops.dirty = true;
            
            if (this.tile.properties.growthStage < 5) {
                this.growCrops();
            }
        }, 500);
    }
}

export default Crops;
