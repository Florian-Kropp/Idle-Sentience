import { ObjectUtils } from "./helpFkt.js";

export class GameState {
    constructor() {
        this.stateData = {};
    }

    isEmpty() {
        return ObjectUtils.isEmpty(this.stateData);
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

    saveDataLocal() {
        localStorage.setItem("GameState", JSON.stringify(this.stateData));
    }

    loadAndCompare(ACloudData) {
        const localRaw = localStorage.getItem("GameState");
        const localData = localRaw ? JSON.parse(localRaw) : null;
        const localCount = localData?.saveCount ?? -1;
        const cloudCount = ACloudData?.saveCount ?? -1;

        if ((cloudCount >= localCount) && ACloudData) {
            this.stateData = ACloudData;
            console.log("GameState: Cloud-Daten übernommen.");
        } else if (localData) {
            this.stateData = localData;
            console.log("GameState: Lokal-Daten übernommen.");
        } else {
            this.stateData = {};
        }
    }
}
