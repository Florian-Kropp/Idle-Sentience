export class Currency {
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