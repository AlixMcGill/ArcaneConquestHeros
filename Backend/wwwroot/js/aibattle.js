"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_js_1 = __importDefault(require("./Modules/cookies.js"));
const hostaddress_js_1 = __importDefault(require("./Modules/hostaddress.js"));
const deckCards_js_1 = __importDefault(require("../js/Modules/deckCards.js"));
const gameboardUi_js_1 = __importDefault(require("./Modules/gameboardUi.js"));
const cardGenerator_js_1 = __importDefault(require("./Modules/cardGenerator.js"));
const gameboardUi_js_2 = __importDefault(require("./Modules/gameboardUi.js"));
const gameLogic_js_1 = __importDefault(require("./Modules/gameLogic.js"));
const diceRolling_js_1 = __importDefault(require("./Modules/diceRolling.js"));
const deckCards = new deckCards_js_1.default;
const cookies = new cookies_js_1.default;
const hostaddress = new hostaddress_js_1.default;
const userData = {
    deckData: [],
    heroData: [],
    itemData: []
};
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
    const userId = cookies.getCookieByName('UserId');
    const url = `${hostaddress.address}/UserData/AllUserAccountData/${userId}`;
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
    }
    catch (error) {
        console.error(error.message);
    }
}
function renderSelectionScreen() {
    const mainOptionsContainer = document.getElementById("ai-game-options");
    deckSelect(mainOptionsContainer);
    difficultySelect(mainOptionsContainer);
}
function deckSelect(parentElement) {
    const formattedDecks = deckCards.formatDeckList(userData.deckData);
    formattedDecks.forEach(element => {
        element.addEventListener('click', () => {
            cycleDeckSelection(element);
            selectedDeckId = parseInt(element.getAttribute('database-id'));
        });
        parentElement.appendChild(element);
    });
}
function cycleDeckSelection(element) {
    const deckSelectButtons = document.querySelectorAll('.deck-list-item');
    [...deckSelectButtons].forEach(button => {
        button.classList.remove('selected-deck');
        highlightProceedButton();
    });
    element.classList.add('selected-deck');
}
function difficultySelect(parentElement) {
    const wrapper = document.createElement('div');
    wrapper.id = 'ai-battle-difficulty-select-wrapper';
    wrapper.classList = 'vertical-flex-container';
    const easyDifficulty = document.createElement('button');
    easyDifficulty.id = 'ai-battle-difficulty-select-easy';
    easyDifficulty.classList = 'ai-battle-difficulty-selection';
    easyDifficulty.innerText = 'Easy';
    easyDifficulty.addEventListener('click', () => {
        cycleDifficultySelection(easyDifficulty);
        selectedDifficulty = 'Easy';
        highlightProceedButton();
    });
    wrapper.appendChild(easyDifficulty);
    const normalDifficulty = document.createElement('button');
    normalDifficulty.id = 'ai-battle-difficulty-select-normal';
    normalDifficulty.classList = 'ai-battle-difficulty-selection';
    normalDifficulty.innerText = 'Normal';
    normalDifficulty.addEventListener('click', () => {
        cycleDifficultySelection(normalDifficulty);
        selectedDifficulty = 'Normal';
        highlightProceedButton();
    });
    wrapper.appendChild(normalDifficulty);
    const hardDifficulty = document.createElement('button');
    hardDifficulty.id = 'ai-battle-difficulty-select-hard';
    hardDifficulty.classList = 'ai-battle-difficulty-selection';
    hardDifficulty.innerText = 'Hard';
    hardDifficulty.addEventListener('click', () => {
        cycleDifficultySelection(hardDifficulty);
        selectedDifficulty = 'Hard';
        highlightProceedButton();
    });
    wrapper.appendChild(hardDifficulty);
    parentElement.appendChild(wrapper);
}
function cycleDifficultySelection(elementToAddClass) {
    const diffucultyButtons = document.querySelectorAll('.ai-battle-difficulty-selection');
    [...diffucultyButtons].forEach(button => {
        button.classList.remove('selected-difficulty');
    });
    elementToAddClass.classList.add('selected-difficulty');
}
function highlightProceedButton() {
    if (selectedDeckId != null && selectedDifficulty != null) {
        const proceedButton = document.getElementById('confirm-selection-button');
        proceedButton.style.backgroundColor = 'green';
        proceedButton.addEventListener('click', () => {
            hideSelectionOptions(true);
            stagePlayerData(selectedDeckId);
            renderGameboardUi();
        });
    }
}
await getUserInventoryData();
renderSelectionScreen();
// player data manipulation
const playerCardObjects = [];
function stagePlayerData(selectedDeck) {
    const cardIdsArray = convertDeckObjectToIdArray(userData.deckData[findDeckIndexById(userData, selectedDeck)]);
    cardIdsArray.forEach(card => {
        playerCardObjects.push(userData.heroData[findHeroIndexById(userData, card)]);
    });
    console.log(playerCardObjects);
}
function findDeckIndexById(userData, id) {
    const index = userData.deckData.findIndex(deck => deck.id === id);
    if (index < 0 || index >= userData.deckData.length) {
        throw new Error(`Index ${index} is out of range for the deckData array.`);
    }
    return index;
}
function findHeroIndexById(userData, id) {
    const index = userData.heroData.findIndex(hero => hero.id === id);
    if (index < 0 || index >= userData.heroData.length) {
        throw new Error(`Index ${index} is out of range for the heroData array.`);
    }
    return index;
}
function convertDeckObjectToIdArray(deck) {
    // takes in a deck object and returns all the hero ids as an array
    const idsToReturn = [];
    for (let key in deck) {
        if (key.startsWith('heroId'))
            idsToReturn.push(deck[key]);
    }
    return idsToReturn;
}
function createPlayerCardLvlArr() {
    let tempArr = [];
    playerCardObjects.forEach(card => {
        tempArr.push(parseInt(card.lvl));
    });
    return tempArr;
}
// ai data generation
let aiCardObjects = [];
function generateAiCards() {
    const lvlArray = createPlayerCardLvlArr();
    const cardGen = new cardGenerator_js_1.default(10, lvlArray);
    aiCardObjects = cardGen.build();
    //console.log(cardGen.build());
    console.log(aiCardObjects);
}
// render Gameboard ui
function renderGameboardUi() {
    const gameboardWrapper = document.getElementById('gameboard-container');
    const gameboard = new gameboardUi_js_1.default(playerCardObjects, userData.itemData);
    gameboard.render(gameboardWrapper);
    addNextPhaseCycleEventListener(); // Game loop init
    generateAiCards(); // TESTING PURPOSES IMPLIMENT LATER
}
// game logic
// if turn state is true it is the players turn
// if turn state is false it is the ai's turn
let turnState = true;
const gamePhases = ["Start", "Action", "Damage", "Healing", "End"];
let currentGamePhase = gamePhases[0];
function addNextPhaseCycleEventListener() {
    const nextPhaseButton = document.getElementById('next-phase-button');
    nextPhaseButton.addEventListener('click', cycleTurnPhase);
}
// "Game loop"
function cycleTurnPhase() {
    const gameUi = new gameboardUi_js_2.default(); // class to access ui updates
    const nextPhaseButton = document.getElementById('next-phase-button');
    const activeClass = 'active-gameboard-ui-phase-item';
    const phaseIcons = [...document.querySelectorAll('.gameboard-ui-phase-item')];
    const index = phaseIcons.findIndex(e => e.classList.contains(activeClass));
    let nextIndex = index + 1;
    if (nextIndex >= phaseIcons.length) {
        nextIndex = 0;
        currentGamePhase = gamePhases[nextIndex]; // changes game phase state
        turnState = !turnState; // swaps turnstate to false when players turn ends
        togglePhaseWrapperClass();
    }
    else {
        currentGamePhase = gamePhases[nextIndex]; // changes game phase state
    }
    phaseIcons.forEach(e => { e.classList.remove(activeClass); });
    phaseIcons[nextIndex].classList.add(activeClass);
    if (!turnState) {
        nextPhaseButton.removeEventListener('click', cycleTurnPhase);
    }
    //checks to see if card elements are able to be dragged onto the game board by the turn state
    checkIfDraggableByState(turnState, currentGamePhase);
    gameUi.renderUpdates(); // renders ui updates when turn cycles
    // Game Logic
    const aiCardSlots = [...document.querySelectorAll('.enemy-card-slot')];
    const playerCardSlots = [...document.querySelectorAll('.player-card-slot')];
    const logic = new gameLogic_js_1.default(playerCardSlots, aiCardSlots, cycleTurnPhase);
    logic.aiBattleLogic(turnState, currentGamePhase, playerCardObjects, aiCardObjects);
    // THIS IS FOR TESTING THE DICE ROLLING ANIMATION ONLY REMOVE LATER STUPID
    const diceRoller = new diceRolling_js_1.default();
    const board = document.getElementById('gameboard-container');
    diceRoller.rollD20(board, "TEST DICE ROLL", (finalRoll) => {
        console.log('DICE ROLL TEST:', finalRoll);
    });
}
function togglePhaseWrapperClass() {
    const gameboardTurnPhaseWrapper = document.getElementById('gameboard-phase-wrapper');
    gameboardTurnPhaseWrapper.classList.remove('players-turn', 'ai-turn');
    gameboardTurnPhaseWrapper.classList.add(turnState ? 'players-turn' : 'ai-turn');
}
function checkIfDraggableByState(turnState, gamePhase) {
    const cardsInInventory = [...document.querySelectorAll('.card-container-item')];
    cardsInInventory.forEach(card => {
        if (turnState && gamePhase === "Start") {
            card.draggable = true;
        }
        else {
            card.draggable = false;
        }
    });
}
//# sourceMappingURL=aibattle.js.map