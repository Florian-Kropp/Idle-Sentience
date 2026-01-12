import { SettingsScreen } from "./settingsScreen.js";
import { SentienceScreen } from "./sentienceScreen.js";

const SCREEN_MAP = {
    "sentience-screen": SentienceScreen,
    "settings-screen": SettingsScreen,
}

export class UI {
    constructor(ACallbacks) {
        this.callbacks = ACallbacks;
        this.screenInstances = {};
    }

    showScreen(AId, ADataPackage) {
        this.hideAndDeactivate();
        this.updateTabButtons(AId);
        const container = document.getElementById(AId);
        if (container) container.hidden = false;
        if (!this.screenInstances[AId]) {
            this.createScreen(AId);
        }
        this.screenInstances[AId].render(ADataPackage);
    }

    createScreen(AId) {
        const screenConfig = SCREEN_MAP[AId];
        if (screenConfig) {
            this.screenInstances[AId] = new screenConfig(this.callbacks);
        }
    }

    hideAndDeactivate() {
        document.querySelectorAll("[data-screen]").forEach(el => el.hidden = true);
        Object.values(this.screenInstances).forEach(screen => {
            screen.setActive(false);
        })
    }

    updateTabButtons(AId) {
        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("is-active"));
        const active = document.querySelector(`.tab-button[data-nav="${AId}"]`);
        if (active) active.classList.add("is-active");
    }

    updateUI(ADataPackage) {
        Object.values(this.screenInstances).forEach(screen => {
            if (screen.isActive()) {
                screen.update(ADataPackage);
            }
        })
    }
}