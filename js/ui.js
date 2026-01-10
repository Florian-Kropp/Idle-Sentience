export class UI {
    constructor(AOnGenerateClick) {
        this.onGenerateClick = AOnGenerateClick;
    }

    showScreen(AId, ADataPackage) {
        document.querySelectorAll("[data-screen]").forEach(el => el.hidden = true);
        const el = document.getElementById(AId);
        if (el) {
            el.hidden = false;
            el.setAttribute("tabindex", "-1");
            el.focus();
            }

        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("is-active"));
        const active = document.querySelector(`.tab-button[data-nav="${AId}"]`);
        if (active) active.classList.add("is-active");


        if (AId == "screen-sentience") {
            this.buildSentienceScreen(ADataPackage.sentienceCount);
        }
        if (AId == "screen-settings") {
            console.log("settings");
        }
    }

    buildSentienceScreen(ASentienceCount) {
        const root = document.getElementById("sentience-root");
        root.innerHTML =  `
            <header class="header-sentience">
                <div id="label-sentience-count">${ASentienceCount}</div>
            </header>
            <div class="content-sentience">
                <button id="button-sentience-gen">GENERATE</button>
            </div>
        `;
        const sentienceGenButton = document.getElementById("button-sentience-gen");
        sentienceGenButton.addEventListener("click", (e) => {
            this.onGenerateClick("sentience");
        });
    }

    UpdateCurrencyCountLabel(ACurrencyType, ADataPackage) {
        const countLabel = document.getElementById(`label-${ACurrencyType}-count`);
        if (countLabel) countLabel.textContent = ADataPackage.sentienceCount;
    }

    getCurrencyCountLabel(ACurrencyType) {
        const countLabel = document.getElementById(`label-${ACurrencyType}-count`);
        return countLabel.textContent;
    }
}