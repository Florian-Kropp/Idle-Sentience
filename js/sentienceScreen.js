export class SentienceScreen {
    constructor(ACallbacks) {
        this.onGenerateClick = ACallbacks.onGenerateClick;
        this.active = false;
    }

    render(ADataPackage) {
        const root = document.getElementById("sentience-root");
        root.innerHTML =  `
            <header class="sentience-header">
                <div id="sentience-label-count">${ADataPackage.sentienceCount}</div>
            </header>
            <div class="sentience-content">
                <button class="generate-button" id="sentience-button-gen">Generate</button>
            </div>
        `;
        this.labelCountEl = document.getElementById("sentience-label-count");
        this.active = true;
        const sentienceGenButton = document.getElementById("sentience-button-gen");
        sentienceGenButton.addEventListener("click", () => {
            this.onGenerateClick("sentience");
        });
    }

    update(ADataPackage) {
        if (!this.active) return;
        this.updateSentienceLabelCount(ADataPackage.sentienceCount);
    }

    updateSentienceLabelCount(ASentienceCount) {
        this.labelCountEl.textContent = ASentienceCount;
    }

    setActive(ABool) {
        this.active = ABool;
    }

    isActive() {
        return this.active;
    }
    
}