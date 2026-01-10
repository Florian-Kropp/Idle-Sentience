export class Currency {
    constructor() {

    }

    getClickIncreaseGeneral(ACurrency) {
        switch(ACurrency) {
            case "sentience":
                return this.getClickIncreaseSentience();
        }
    }

    getClickIncreaseSentience() {
        return 1;
    }


}