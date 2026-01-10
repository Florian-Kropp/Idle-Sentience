import { UI } from "./ui.js";
import { Currency } from "./currency.js";
import { GameState } from "./gameState.js";

class GameEngine {
    constructor() {
        this.ui = new UI((ACurrencyType) => this.increaseCurrencyCountClick(ACurrencyType));
        this.currency = new Currency();
        this.gameState = new GameState();
        document.addEventListener("click", (e) => {
            const nav = e.target.closest("[data-nav]");
            if (nav) {
                this.ui.showScreen(nav.dataset.nav, this.getUiDataPackage());
                return;
            }
        });
    }

    init() {
        this.gameState.loadGameState();
        this.gameState.initData("sentienceCount", 0);
        this.ui.showScreen("screen-sentience", this.getUiDataPackage()); 
    }

    getUiDataPackage() {
        return {
            sentienceCount: this.gameState.getData("sentienceCount"),
        };
    }

    increaseCurrencyCountClick(ACurrencyType) {
        const oldNum = this.gameState.getData("sentienceCount");
        const newNum = oldNum + this.currency.getClickIncreaseGeneral(ACurrencyType);
        this.gameState.editData(`${ACurrencyType}Count`, newNum);
        this.ui.UpdateCurrencyCountLabel(ACurrencyType, this.getUiDataPackage());
    }

}

let game = new GameEngine();
game.init();