export default class DeckCards {
    constructor() {
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

    createNewDeckWindow(parentElement) {

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

        parentElement.appendChild(wrapper);
    }
}
