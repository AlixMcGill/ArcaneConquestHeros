import renderHeroCard from './heroCard.js';
import cardGenerator from './cardGenerator.js';

export default class gameboard {
    constructor(playerCardsArray, itemCardsArray) {
        this.playerCardsArray = playerCardsArray;
        this.itemCardsArray = itemCardsArray;
        this.classes = {
            fighter: "Fighter",
            assassin: "Assassin",
            sorcerer: "Sorcerer",
            trueTank: "True Tank",
            witch: "Witch"
        };
    }

    // ---------- Initial Board Rendering ---------- 

    findItemIndexById(itemData, id) { // finds the index of a item using the item.id
        //console.log(itemData);
        const index = itemData.findIndex(item => item.id === id);

        if (index < 0 || index >= itemData.length) {
            console.error(`Index ${index} is out of range for the itemData array.`); // change to throw new error later
            // player cards during testing do not have the required item card
            return 0;
        }

        return index;
    }

    renderBoard(parentElement) {
        const boardWrapper = document.createElement('div');
        boardWrapper.id = 'board-wrapper-id';
        boardWrapper.classList = 'board-wrapper';

        parentElement.appendChild(boardWrapper);

        const enemyContainer = document.createElement('div');
        enemyContainer.id = 'enemy-board-container-id';
        enemyContainer.classList = 'flex-container enemy-container empty-card-container';

        boardWrapper.appendChild(enemyContainer);

        const playerContainer = document.createElement('div');
        playerContainer.id = 'player-board-container-id';
        playerContainer.classList = 'flex-container player-container empty-card-container';

        boardWrapper.appendChild(playerContainer);
 
        const feildCardAmount = 4;

        function createEmptyCardSlot(parent, feildPosition, isDroppable, index, removeDropFunc) {
            const emptyCardSlot = document.createElement('div');
            emptyCardSlot.id = `${feildPosition}-id-${index}`;
            emptyCardSlot.classList = `empty-card-slot ${feildPosition}`;
            parent.appendChild(emptyCardSlot);

            if (isDroppable) {
                emptyCardSlot.addEventListener('dragover', (event) => {
                    event.preventDefault();
                });

                emptyCardSlot.addEventListener('drop', (event) => {
                    event.preventDefault();

                    const draggedItemId = event.dataTransfer.getData('text');
                    const draggedItem = document.getElementById(draggedItemId);
                    
                    if (draggedItem) {
                        emptyCardSlot.appendChild(draggedItem);
                        removeDropFunc();
                        draggedItem.classList.remove('card-in-hand');
                        draggedItem.classList.add('card-in-play');
                    } else {
                        console.error("Dragged item not found!");
                    }
                });
            }
        }

        for (let i = 0; i < feildCardAmount; i++) {
            createEmptyCardSlot(enemyContainer, 'enemy-card-slot', false, i, this.checkPlayerCardsSentToBoard);
        }
 
        for (let i = 0; i < feildCardAmount; i++) {
            createEmptyCardSlot(playerContainer, 'player-card-slot', true, i, this.checkPlayerCardsSentToBoard);

        }
    }

    renderGameTurnPhaseUi(parentElement) {
        const wrapper = document.createElement('div');
        wrapper.id = 'gameboard-phase-wrapper';
        wrapper.classList = 'gameboard-phase-wrapper-class flex-container players-turn';

        const cardSelectPhase = document.createElement('p');
        cardSelectPhase.classList = 'gameboard-ui-phase-item active-gameboard-ui-phase-item';
        cardSelectPhase.innerText = 'Start';

        wrapper.appendChild(cardSelectPhase);

        const actionSelectPhase = document.createElement('p');
        actionSelectPhase.classList = 'gameboard-ui-phase-item';
        actionSelectPhase.innerText = 'Action';

        wrapper.appendChild(actionSelectPhase);

        const damagePhase = document.createElement('p');
        damagePhase.classList = 'gameboard-ui-phase-item';
        damagePhase.innerText = 'Damage';

        wrapper.appendChild(damagePhase);

        const healSelectPhase = document.createElement('p');
        healSelectPhase.classList = 'gameboard-ui-phase-item';
        healSelectPhase.innerText = 'Healing';

        wrapper.appendChild(healSelectPhase);

        const endPhase = document.createElement('p');
        endPhase.classList = 'gameboard-ui-phase-item';
        endPhase.innerText = 'End';

        wrapper.appendChild(endPhase);

        const nextPhaseButton = document.createElement('button');
        nextPhaseButton.id = 'next-phase-button';
        nextPhaseButton.innerText = 'Next Phase';

        wrapper.appendChild(nextPhaseButton);

        parentElement.appendChild(wrapper);
    }

    renderCardInventory(parentElement) {
        const cardGen = new cardGenerator();

        const wrapper = document.createElement('div');
        wrapper.id = 'card-inventory-wrapper';
        wrapper.classList = 'flex-container';
        wrapper.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        wrapper.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedItemId = event.dataTransfer.getData('text');
            const draggedItem = document.getElementById(draggedItemId);

            if (draggedItem) {
                draggedItem.appendChild(draggedItem);
            } else {
                console.error("Dragged item not found!");
            }
        });

        this.playerCardsArray.forEach((cardObject, index) => {
            const renderCard = new renderHeroCard( // init render hero card class
                cardObject.id,
                '',
                cardObject.name,
                cardObject.lvl,
                cardObject.currentExp,
                cardObject.nextLvlExp,
                cardObject.class,
                cardObject.strengthStat,
                cardObject.intellegenceStat,
                cardObject.dexterityStat,
                cardObject.wisdomStat,
                ''
            );

            // calculate card vitality
            //console.log(cardObject.itemHeldId);
            const itemIndex = this.findItemIndexById(this.itemCardsArray, cardObject.itemHeldId);
            const vitality = cardGen.generateVitality(
                cardObject.class, cardObject.strengthStat, this.itemCardsArray[itemIndex].strengthMod, cardObject.lvl);

            // create the player card
            const cardContainer = document.createElement('div');
            cardContainer.classList = 'card-container-item flex-vertical card-in-hand';
            this.cardClassColor(cardContainer, cardObject.class);
            cardContainer.draggable = true;
            cardContainer.id = `card-${cardObject.id}-index-${index}`;
            cardContainer.setAttribute("database-id", cardObject.id);
            cardContainer.setAttribute("card-index", index);
            cardContainer.setAttribute("vitality", vitality);
            cardContainer.setAttribute("card-class", cardObject.class);
            cardContainer.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', event.target.id);
            });
            
            renderCard.renderMiniCard(cardContainer, index, vitality);

            wrapper.appendChild(cardContainer);
        });

        parentElement.appendChild(wrapper);
    }

    cardClassColor(element, cardClass) { // this code is repeated in gameLogic.js
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

    // call this method to render game board and player items
    render(parentElement) { 
        this.renderBoard(parentElement);
        this.renderGameTurnPhaseUi(parentElement);
        this.renderCardInventory(parentElement);
        this.updateCardVitalityBar(); // updates the card health bar to init
    }

    // ---------- Update Logic ----------
    
    updateCardVitalityBar() {
       const allCards = [...document.querySelectorAll('.card-container-item')];

        allCards.forEach(card => {
            const vitalityBar = card.querySelector('.vitality-bar');
            const currentVitality = parseInt(card.querySelector('.vitality-current-value').innerText);
            const maxVitality = parseInt(card.querySelector('.vitality-max-value').innerText);

            if (isNaN(currentVitality) || isNaN(maxVitality) || currentVitality === 0 || maxVitality === 0) {
                console.warn("Invalid vitality values:", currentVitality, maxVitality);
                vitalityBar.style.width = "0%";
            }

            const vitalityPercentage = (currentVitality / maxVitality) * 100;

            vitalityBar.style.width = `${vitalityPercentage}%`;
        });
    }

    checkPlayerCardsSentToBoard() {
        console.log("sent");
        const allPlayerCards = [...document.querySelectorAll('.card-container-item')];
        allPlayerCards.forEach(card => {
            card.draggable = false;
        });
    }

    // Method gets called when game updates are required
    renderUpdates() {
        this.updateCardVitalityBar();
    }
}
