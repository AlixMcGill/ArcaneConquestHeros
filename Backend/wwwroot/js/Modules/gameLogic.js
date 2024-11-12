import renderHeroCard from "./heroCard.js";

export default class gameLogic {
    constructor(playerCardSlots, aiCardSlots, cycleGameLoop) {
        this.playerCardSlots = playerCardSlots;
        this.aiCardSlots = aiCardSlots;
        this.cycleGameLoop = cycleGameLoop; // be careful of recursion
        this.aiTurnDelay = 60 // may not use if ai turns are too quick add delay be for logic is calculated
        this.turnPhase = {
            start: "Start",
            action: "Action",
            damage: "Damage",
            healing: "Healing",
            end: "End"
        }
        this.classes = {
            fighter: "Fighter",
            assassin: "Assassin",
            sorcerer: "Sorcerer",
            trueTank: "True Tank",
            witch: "Witch"
        };
        this.allHeroCards = [];
        this.allAiCards = [];
    }
    // ---------- Extraneous Logic ----------
    
    checkForEmptyCardSlots(cardSlots) { 
        // checks the card slots passed and returns an array of the slot id's that do not contain a card
        let emptySlots = [];
        cardSlots.forEach(e => {
            if (!e.hasChildNodes()) {
                emptySlots.push(e.id);
            }
        });
        console.log(emptySlots);
        return emptySlots;
    }

    findRandIndex(arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    }

    cardClassColor(element, cardClass) { // this code is repeated in gameboardUI.js
        switch (cardClass) {
            case this.classes.fighter:
                element.classList.add('card-class-fighter');
                element.classList.add('white-text');
                break;
            case this.classes.trueTank:
                element.classList.add('card-class-true-tank');
                break;
            case this.classes.assassin:
                element.classList.add('card-class-assassin');
                element.classList.add('white-text');
                break;
            case this.classes.sorcerer:
                element.classList.add('card-class-sorcerer');
                element.classList.add('white-text');
                break;
            case this.classes.witch:
                element.classList.add('card-class-witch');
                element.classList.add('white-text');
                break;
            default:
                console.error('cardClassColor func in gameboardUi.js did not find the correct class to add color to');
                break;
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

        const emptySlots = this.checkForEmptyCardSlots(this.aiCardSlots);

        if (emptySlots.length === 0) {
            this.cycleGameLoop(); // check if empty cards slots exsit if none do cycle the game loop
            return;
        }

        // remove all played card from allAiCards array

        // pick a random card to be displayed
        const randomEmptySlotIndex = this.findRandIndex(emptySlots.length);
        const emptySlotToBeAppended = emptySlots[randomEmptySlotIndex]; // find a random empty slot

        const randomEnemyCardIndex = this.findRandIndex(this.allAiCards.length);
        const randomEnemyCard = this.allAiCards[randomEnemyCardIndex]; // find random ai card


        // create card and append it to the screen in specified card slot
        const newCard = new renderHeroCard(
            randomEnemyCard.id,
            '',
            randomEnemyCard.name,
            randomEnemyCard.lvl,
            '',
            '',
            randomEnemyCard.class,
            randomEnemyCard.strength,
            randomEnemyCard.intellegence,
            randomEnemyCard.dexterity,
            randomEnemyCard.wisdom,
            ''
        );

        const emptySlot = document.getElementById(emptySlotToBeAppended);
        const emptySlotId = emptySlotToBeAppended.slice(-1);
        

        const aiCardContainer = document.createElement('div');
        aiCardContainer.classList = 'ai-card-container-item flex-vertical enemy-feild-card';
        this.cardClassColor(aiCardContainer, randomEnemyCard.class);
        aiCardContainer.id = `enemy-card-${randomEnemyCard.id}-index-${emptySlotId}`;
        aiCardContainer.setAttribute("database-id", randomEnemyCard.id);
        aiCardContainer.setAttribute('vitality', randomEnemyCard.vitality);
        aiCardContainer.setAttribute('card-class', randomEnemyCard.class);

        newCard.renderMiniCard(aiCardContainer, emptySlotId, randomEnemyCard.vitality);

        emptySlot.appendChild(aiCardContainer);

        this.cycleGameLoop();
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

    aiBattleLogic(turnState, turnPhase, heroCards, aiCards) {
        this.allHeroCards = heroCards;
        this.allAiCards = aiCards;
        // state machine to determine what turn and phase the game is currently in when checked and runs appropriate functions
        if (turnState && turnPhase === this.turnPhase.start) { // player turn & phase state checks
            this.playerStartPhase(turnState, turnPhase);
            console.log('player start phase');

        } else if (turnState && turnPhase === this.turnPhase.action) {
            this.playerActionPhase(turnState, turnPhase);
            console.log('player action phase');

        } else if (turnState && turnPhase === this.turnPhase.damage) {
            this.playerDamagePhase(turnState, turnPhase);
            console.log('player damage phase');

        } else if (turnState && turnPhase === this.turnPhase.healing) {
            this.playerHealingPhase(turnState, turnPhase);
            console.log('player healing phase');

        } else if (turnState && turnPhase === this.turnPhase.end) {
            this.playerEndPhase(turnState, turnPhase);
            console.log('player end phase');

        } else if (!turnState && turnPhase === this.turnPhase.start) { // AI turn & phase state checks
            this.aiStartPhase(turnState, turnPhase);
            console.log('ai start phase');

        } else if (!turnState && turnPhase === this.turnPhase.action) {
            this.aiActionPhase(turnState, turnPhase);
            console.log('ai action phase');

        } else if (!turnState && turnPhase === this.turnPhase.damage) {
            this.aiDamagePhase(turnState, turnPhase);
            console.log('ai damage phase');

        } else if (!turnState && turnPhase === this.turnPhase.healing) {
            this.aiHealingPhase(turnState, turnPhase);
            console.log('ai healing phase');

        } else if (!turnState && turnPhase === this.turnPhase.end) {
            this.aiEndPhase(turnState, turnPhase);
            console.log('ai end phase');

        } else {
            throw new Error("The turn state could not be established!!!!");
        }
    }
}
