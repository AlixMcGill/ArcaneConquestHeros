export default class gameboard {
    constructor(playerCardsArray) {
        this.playerCardsArray = playerCardsArray;
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

    renderCardInventory() {

    }

    render(parentElement) {
        this.renderGameTurnPhaseUi(parentElement);
    }
}
