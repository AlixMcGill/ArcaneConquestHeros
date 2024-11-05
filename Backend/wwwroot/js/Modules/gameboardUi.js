import renderHeroCard from './heroCard.js';

export default class gameboard {
    constructor(playerCardsArray) {
        this.playerCardsArray = playerCardsArray;
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

        function createEmptyCardSlot(parent, feildPosition, isDroppable, index) {
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
                    } else {
                        console.error("Dragged item not found!");
                    }
                });
            }
        }

        for (let i = 0; i < feildCardAmount; i++) {
            createEmptyCardSlot(enemyContainer, 'enemy-card-slot', false, i);
        }
 
        for (let i = 0; i < feildCardAmount; i++) {
            createEmptyCardSlot(playerContainer, 'player-card-slot', true, i);

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
        const wrapper = document.createElement('div');
        wrapper.id = 'card-inventory-wrapper';
        wrapper.classList = 'flex-container';

        this.playerCardsArray.forEach((cardObject, index) => {
            const renderCard = new renderHeroCard(
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

            const cardContainer = document.createElement('div');
            cardContainer.classList = 'card-container-item flex-vertical'
            cardContainer.draggable = true;
            cardContainer.id = `card-${cardObject.id}-index-${index}`;
            cardContainer.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', event.target.id);
            });
            
            renderCard.renderMiniCard(cardContainer, index);

            wrapper.appendChild(cardContainer);
        });

        parentElement.appendChild(wrapper);
    }

    render(parentElement) {
        this.renderBoard(parentElement);
        this.renderGameTurnPhaseUi(parentElement);
        this.renderCardInventory(parentElement);
    }
}
