
export default class gameLogic {
    constructor() {
        this.turnPhase = {
            start: "Start",
            action: "Action",
            damage: "Damage",
            healing: "Healing",
            end: "End"
        }
    }

    // ---------- Player Phase Logic ----------

    // the players turnState will always return true
    playerStartPhase(turnState, turnPhase) {
        if (!turnState || turnPhase !== this.turnPhase.start){
            console.error("Player Start Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    playerActionPhase(turnState, turnPhase) {
        if (!turnState || turnPhase !== this.turnPhase.action){
            console.error("Player Action Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    playerDamagePhase(turnState, turnPhase) {
        if (!turnState || turnPhase !== this.turnPhase.damage){
            console.error("Player Damage Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    playerHealingPhase(turnState, turnPhase) {
        if (!turnState || turnPhase !== this.turnPhase.healing){
            console.error("Player Healing Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    playerEndPhase (turnState, turnPhase) {
        if (!turnState || turnPhase !== this.turnPhase.end){
            console.error("Player End Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    // ---------- AI Phase Logic ----------
   
    // the ai turnState will always return false
    aiStartPhase(turnState, turnPhase) {
        if (turnState || turnPhase !== this.turnPhase.start){
            console.error("AI Start Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    aiActionPhase(turnState, turnPhase) {
        if (turnState || turnPhase !== this.turnPhase.action){
            console.error("AI Action Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    aiDamagePhase(turnState, turnPhase) {
        if (turnState || turnPhase !== this.turnPhase.damage){
            console.error("AI Damage Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    aiHealingPhase(turnState, turnPhase) {
        if (turnState || turnPhase !== this.turnPhase.healing){
            console.error("AI Healing Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    aiEndPhase(turnState, turnPhase) {
        if (turnState || turnPhase !== this.turnPhase.end){
            console.error("AI End Phase Logic was called in the incorrect turn state or phase", turnState, turnPhase);
            return;
        }

    }

    aiBattleLogic(turnState, turnPhase) {
        // state machine to determine what turn and phase the game is currently in when checked and runs appropriate functions
        if (turnState && turnPhase === this.turnPhase.start) { // player turn & phase state checks
            this.playerStartPhase(turnState, turnPhase);

        } else if (turnState && turnPhase === this.turnPhase.action) {
            this.playerActionPhase(turnState, turnPhase);

        } else if (turnState && turnPhase === this.turnPhase.damage) {
            this.playerDamagePhase(turnState, turnPhase);

        } else if (turnState && turnPhase === this.turnPhase.healing) {
            this.playerHealingPhase(turnState, turnPhase);

        } else if (turnState && turnPhase === this.turnPhase.end) {
            this.playerEndPhase(turnState, turnPhase);

        } else if (!turnState && turnPhase === this.turnPhase.start) { // AI turn & phase state checks
            this.aiStartPhase(turnState, turnPhase);

        } else if (!turnState && turnPhase === this.turnPhase.action) {
            this.aiActionPhase(turnState, turnPhase);

        } else if (!turnState && turnPhase === this.turnPhase.damage) {
            this.aiDamagePhase(turnState, turnPhase);

        } else if (!turnState && turnPhase === this.turnPhase.healing) {
            this.aiHealingPhase(turnState, turnPhase);

        } else if (!turnState && turnPhase === this.turnPhase.end) {
            this.aiEndPhase(turnState, turnPhase);

        } else {
            throw new Error("The turn state could not be established!!!!");
        }
    }
}
