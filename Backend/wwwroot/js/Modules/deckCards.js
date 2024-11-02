export default class DeckCards {
    constructor() {
        this.currentHero;
    }

    renderDeckOptions(parentElement, numberOfDecks) {

        const wrapperId = 'deck-options-wrapper-id';
        const wrapperClass = 'deck-options-wrapper';

        const newDeckBtnId = 'deck-options-new-id';
        const newDeckBtnClass = 'deck-options-new';
        const newDeckInnerText = 'Create New Deck';

        const numOfDecksId = 'deck-options-num-id';
        const numOfDecksClass = 'deck-options-num';
        const numOfDecksInnerText = `Current Decks: ${numberOfDecks}`;

        const wrapper = document.createElement('div');
        wrapper.id = wrapperId;
        wrapper.classList = wrapperClass;

        const numOfDecks = document.createElement('div');
        numOfDecks.id = numOfDecksId;
        numOfDecks.classList = numOfDecksClass;
        numOfDecks.innerText = numOfDecksInnerText;

        wrapper.appendChild(numOfDecks);

        const newDeckBtn = document.createElement('button');
        newDeckBtn.id = newDeckBtnId;
        newDeckBtn.classList = newDeckBtnClass;
        newDeckBtn.innerText = newDeckInnerText;

        wrapper.appendChild(newDeckBtn);

        parentElement.appendChild(wrapper);
        
    }

    createNewDeckWindow(parentElement, addNewHero) {

        const numOfCardsPerDeck = 10;

        const wrapperId = 'create-new-deck-wrapper-id';
        const wrapperClass = 'create-new-deck-wrapper'

        const headerId = 'create-new-deck-header-id';
        const headerClass = 'create-new-deck-header';

        const titleId = 'create-new-deck-title-id';
        const titleClass = 'create-new-deck-title';
        const titleInnerText = 'Create New Deck';

        const closeWindowId = 'create-new-deck-close-id';
        const closeWindowClass = 'create-new-deck-close';
        const closeWindowInnerText = 'X';

        const createDeckOptionsWrapperId = 'create-new-deck-options-wrapper-id';
        const createDeckOptionsWrapperClass = 'create-new-deck-options-wrapper';

        const createDeckNameId = 'create-new-deck-name-id';
        const createDeckNameClass = 'create-new-deck-name';
        const createDeckNamePlaceholder = 'Deck Name';

        const createDeckDescriptionId = 'create-new-deck-description-id';
        const createDeckDescriptionClass = 'create-new-deck-description';
        const createDeckDescriptionPlaceholder = 'Deck Description';

        const createDeckBtnId = 'create-deck-button-id';
        const createDeckBtnClass = 'create-deck-button';
        const createDeckBtnInnerText = 'Create Deck';

        const wrapper = document.createElement('div');
        wrapper.id = wrapperId;
        wrapper.classList = wrapperClass;

        const header = document.createElement('div');
        header.id = headerId;
        header.classList = headerClass;

        wrapper.appendChild(header);

        const title = document.createElement('p');
        title.id = titleId;
        title.classList = titleClass;
        title.innerText = titleInnerText;

        header.appendChild(title);

        const closeWindowBtn = document.createElement('button');
        closeWindowBtn.id = closeWindowId;
        closeWindowBtn.classList = closeWindowClass;
        closeWindowBtn.innerText = closeWindowInnerText;

        closeWindowBtn.addEventListener('click', () => { wrapper.remove() });

        header.appendChild(closeWindowBtn);

        const deckOptionsWrapper = document.createElement('div');
        deckOptionsWrapper.id = createDeckOptionsWrapperId;
        deckOptionsWrapper.classList = createDeckOptionsWrapperClass;

        wrapper.appendChild(deckOptionsWrapper);

        const createDeckName = document.createElement('input');
        createDeckName.id = createDeckNameId;
        createDeckName.classList = createDeckNameClass;
        createDeckName.type = 'text';
        createDeckName.placeholder = createDeckNamePlaceholder;

        deckOptionsWrapper.appendChild(createDeckName);

        const createDeckDescription = document.createElement('input');
        createDeckDescription.id = createDeckDescriptionId;
        createDeckDescription.classList = createDeckDescriptionClass;
        createDeckDescription.type = 'text';
        createDeckDescription.placeholder = createDeckDescriptionPlaceholder;

        deckOptionsWrapper.appendChild(createDeckDescription);

        for (let i = 0; i < numOfCardsPerDeck; i++) {
            const deckCardWrapperId = `deck-card-wrapper-id-${i}`;
            const deckCardWrapperClass = 'deck-card-wrapper';

            const addHeroBtnId = `add-hero-button-id-${i}`;
            const addHeroBtnClass = 'add-hero-button';
            const addHeroBtnInnerText = 'Add New Hero';

            const deckCardWrapper = document.createElement('div');
            deckCardWrapper.id = deckCardWrapperId;
            deckCardWrapper.classList = deckCardWrapperClass;
            
            const addHeroBtn = document.createElement('button');
            addHeroBtn.id = addHeroBtnId;
            addHeroBtn.classList = addHeroBtnClass;
            addHeroBtn.innerText = addHeroBtnInnerText;

            addHeroBtn.addEventListener('click', () => {

                const allCardWrappers = document.querySelectorAll(`.${deckCardWrapperClass}`);

                [...allCardWrappers].forEach((card) => {
                    card.classList = deckCardWrapperClass;
                });

                deckCardWrapper.classList.add('selected-item-for-hero-insertion');
                
                // using this.id does not work in the given context
                const buttonId = event.target.id; 
                  
                const selectHeroWrapperId = 'select-hero-wrapper-id';
                const selectHeroWrapperClass = 'select-hero-wrapper';

                const heroWrapper = document.getElementById(selectHeroWrapperId);
                
                if (heroWrapper != null) heroWrapper.remove();

                const selectHeroWrapper = document.createElement('div');
                selectHeroWrapper.id = selectHeroWrapperId;
                selectHeroWrapper.classList = selectHeroWrapperClass;

                wrapper.appendChild(selectHeroWrapper);

                addNewHero(buttonId);
            });

            deckCardWrapper.appendChild(addHeroBtn);
            deckOptionsWrapper.appendChild(deckCardWrapper);
        }

        const createDeckBtn = document.createElement('button');
        createDeckBtn.id = createDeckBtnId;
        createDeckBtn.classList = createDeckBtnClass;
        createDeckBtn.innerText = createDeckBtnInnerText;

        createDeckBtn.addEventListener('click', () => {
            console.log('this creates a new deck');
        });

        deckOptionsWrapper.appendChild(createDeckBtn);

        parentElement.appendChild(wrapper);
    }

    formatDeckList(deckArray) {
        let deckListToRender = [];

        deckArray.forEach((deck, index) => {
            const deckContainer = document.createElement('div');
            deckContainer.id = `deck-container-id-${index}`;
            deckContainer.classList = 'flex-container deck-list-item';
            deckContainer.setAttribute('database-id', deck.id);

            const deckName = document.createElement('p');
            deckName.id = `deck-list-name-id-${index}`;
            deckName.classList = 'deck-list-name';
            deckName.innerText = deck.name;

            deckContainer.appendChild(deckName);

            deckListToRender.push(deckContainer);
        });

        return deckListToRender;
    }
}
