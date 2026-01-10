export class GameState {
    constructor() {
        this.stateData = {};
    }

    isEntry() {

    }

    isKey(AKey) {
        if (AKey in this.stateData) {
            return true;
        }
        return false;
    }

    initData(AKey, AValue) {
        if (AKey in this.stateData) {
            console.log(`Key: ${AKey} exists.`);
            return;
        }
        this.stateData[AKey] = AValue;
    }

    editData(AKey, AValue) {
        if (!(AKey in this.stateData)) {
            console.log(`Key: ${AKey} does not exist.`);
            return;
        }
        this.stateData[AKey] = AValue;
    }

    getData(AKey) {
        if (!(AKey in this.stateData)) {
            console.log(`Key: ${AKey} does not exist.`);
            return;
        }
        return this.stateData[AKey];
    }

    saveGameState() {
        localStorage.setItem("GameState", JSON.stringify(this.stateData));
    }

    loadGameState() {
        const data = localStorage.getItem("GameState");
        if ((data !== null)) {
            this.stateData = JSON.parse(data);
        }
    }
}
