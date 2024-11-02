import Cookie from './Modules/cookies.js';
import hostadd from './Modules/hostaddress.js';
import DeckCards from '../js/Modules/deckCards.js';

const deckCards = new DeckCards;
const cookies = new Cookie;
const hostaddress = new hostadd;

const userData = {
    deckData: [],
    heroData: [],
    itemData: []
}

let selectedDeckId = null;
let selectedDifficulty = null;

// render game selection options and fetch data from server

function hideSelectionOptions(bool) { 
    // hides the game selection options when passed a true boolean value and shows them when passed a false boolean value
    const mainSelectionOptions = document.getElementById('ai-game-options');
    const proceedButton = document.getElementById('confirm-selection-button');

    if (bool) {
        mainSelectionOptions.style.display = 'none';
        proceedButton.style.display = 'none';
    }

    if (!bool) {
        mainSelectionOptions.style.display = 'block';
        proceedButton.style.display = 'block';
    }
}

// function is repeated in accountpageui.js find workaround later
async function getUserInventoryData() {
    const userId =  cookies.getCookieByName('UserId');
    const url = `${hostaddress.address}/UserData/AllUserAccountData/${userId}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        if (response.ok) {
            userData.deckData = data.deckInv;
            userData.heroData = data.heroInv;
            userData.itemData = data.itemInv;
            console.log(userData);
        }

    } catch (error) {
       console.error(error.message);
    }
}

function renderSelectionScreen() { // calls functions to render the selection screen 
    const mainOptionsContainer = document.getElementById("ai-game-options");
    deckSelect(mainOptionsContainer);
    difficultySelect(mainOptionsContainer);
}

function deckSelect(parentElement) { // render deck list
    const formattedDecks = deckCards.formatDeckList(userData.deckData);

    formattedDecks.forEach(element => {
        element.addEventListener('click', () => {
            cycleDeckSelection(element);
            selectedDeckId = parseInt(element.getAttribute('database-id'));
        });
        parentElement.appendChild(element);
    });
}

function cycleDeckSelection(element) { // highlight selected deck in list
    const deckSelectButtons = document.querySelectorAll('.deck-list-item');
    [...deckSelectButtons].forEach(button => {
        button.classList.remove('selected-deck');
        highlightProceedButton();
    });

    element.classList.add('selected-deck');
}


function difficultySelect(parentElement) { // render different difficulty options
    const wrapper = document.createElement('div');
    wrapper.id = 'ai-battle-difficulty-select-wrapper';
    wrapper.classList = 'vertical-flex-container';


    const easyDifficulty = document.createElement('button');
    easyDifficulty.id = 'ai-battle-difficulty-select-easy';
    easyDifficulty.classList = 'ai-battle-difficulty-selection'
    easyDifficulty.innerText = 'Easy';

    easyDifficulty.addEventListener('click', () => {
        cycleDifficultySelection(easyDifficulty);
        selectedDifficulty = 'Easy';
        highlightProceedButton();
    });
    wrapper.appendChild(easyDifficulty);


    const normalDifficulty = document.createElement('button');
    normalDifficulty.id = 'ai-battle-difficulty-select-normal';
    normalDifficulty.classList = 'ai-battle-difficulty-selection'
    normalDifficulty.innerText = 'Normal';

    normalDifficulty.addEventListener('click', () => {
        cycleDifficultySelection(normalDifficulty);
        selectedDifficulty = 'Normal';
        highlightProceedButton();
    });
    wrapper.appendChild(normalDifficulty);


    const hardDifficulty  = document.createElement('button');
    hardDifficulty.id = 'ai-battle-difficulty-select-hard';
    hardDifficulty.classList = 'ai-battle-difficulty-selection'
    hardDifficulty.innerText = 'Hard';

    hardDifficulty.addEventListener('click', () => {
        cycleDifficultySelection(hardDifficulty);
        selectedDifficulty = 'Hard';
        highlightProceedButton();
    });
    wrapper.appendChild(hardDifficulty);

    parentElement.appendChild(wrapper);
}

function cycleDifficultySelection(elementToAddClass) { // highlight different difficulty options 
    const diffucultyButtons = document.querySelectorAll('.ai-battle-difficulty-selection');
    [...diffucultyButtons].forEach(button => {
        button.classList.remove('selected-difficulty');
    });

    elementToAddClass.classList.add('selected-difficulty');
}

function highlightProceedButton() { // when deck and difficulty selected highlight the proceed button 
    if (selectedDeckId != null && selectedDifficulty != null) {
        const proceedButton = document.getElementById('confirm-selection-button');
        proceedButton.style.backgroundColor = 'green';

        proceedButton.addEventListener('click', () => {
            console.log('proceed');
            hideSelectionOptions(true);
            stagePlayerData(selectedDeckId);
        });
    }
}

await getUserInventoryData();
renderSelectionScreen();

// player data manipulation

const playerCards = [];

function stagePlayerData(selectedDeck) {
    console.log(
    convertDeckObjectToIdArray(userData.deckData[findDeckIndexById(userData, selectedDeck)])
    );
}

function findDeckIndexById(userData, id) { // finds the index of deck array using the id of deck object inside array
    const index = userData.deckData.findIndex(deck => deck.id === id);
     
    if (index < 0 || index >= userData.deckData.length) {
        throw new Error(`Index ${index} is out of range for the deckData array.`);
    }

    return index;
}

function convertDeckObjectToIdArray(deck) {
    // takes in a deck object and returns all the hero ids as an array
    const idsToReturn = [];

    for(let key in deck) {
        if (key.startsWith('heroId'))
            idsToReturn.push(deck[key]);
    }
    
    return idsToReturn;
}

// ai data generation

// load game items

// game logic

