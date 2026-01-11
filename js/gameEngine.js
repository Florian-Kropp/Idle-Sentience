import { UI } from "./ui.js";
import { Currency } from "./currency.js";
import { GameState } from "./gameState.js";
import { DatabaseService } from "./db.js";

class GameEngine {
    constructor() {
        this.ui = new UI((ACurrencyType) => this.increaseCurrencyCountClick(ACurrencyType));
        this.currency = new Currency();
        this.gameState = new GameState();
        this.playerID = this.generatePlayerID();
        this.initEventListener();
    }

    initEventListener() {
        document.addEventListener("click", (e) => {
            const nav = e.target.closest("[data-nav]");
            if (nav) {
                this.ui.showScreen(nav.dataset.nav, this.getUiDataPackage());
                return;
            }
        });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.syncData();
            }
        });
    }

    async init() {
        this.gameState.loadAndCompare(await DatabaseService.load("profiles", this.playerID));
        this.gameState.initData("playerID", this.playerID);
        this.gameState.initData("sentienceCount", 0);
        this.gameState.initData("saveCount", 0);
        this.ui.showScreen("screen-sentience", this.getUiDataPackage()); 
        setInterval(() => this.syncData(), 5 * 60 * 1000);
    }

    generatePlayerID() {
        return "test1";
    }

    getUiDataPackage() {
        return {
            sentienceCount: this.gameState.getData("sentienceCount"),
        };
    }

    increaseCurrencyCountClick(ACurrencyType) {
        const oldNum = this.gameState.getData(`${ACurrencyType}Count`);
        const newNum = oldNum + this.currency.getClickIncreaseGeneral(ACurrencyType);
        this.gameState.editData(`${ACurrencyType}Count`, newNum);
        this.ui.UpdateCurrencyCountLabel(ACurrencyType, this.getUiDataPackage());
    }

    async syncData() {
        const nextCount = (this.gameState.getData("saveCount") || 0) + 1;
        this.gameState.editData("saveCount", nextCount);
        this.gameState.saveDataLocal();
        DatabaseService.save("profiles", this.playerID, this.gameState.stateData);
    }
}
let game = new GameEngine();
game.init();