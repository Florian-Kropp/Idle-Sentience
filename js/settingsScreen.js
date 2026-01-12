export class SettingsScreen {
    constructor() {
        this.active = false;
    }

    render() {
        const root = document.getElementById("settings-root");
        root.innerHTML = `
            <div class="settings-container">
                <div class="settings-row">
                    <div class="settings-row-panel">
                        <div class="settings-label-text">Login/Register: </div>
                    </div>
                    <div class="settings-row-panel">
                        <button class="settings-button flex-grow-1">Open</button>
                    </div>
                </div>
            </div>
        `;
    }

    setActive(ABool) {
        this.active = ABool;
    }

    isActive() {
        return this.active;
    }

}