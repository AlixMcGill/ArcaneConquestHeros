import builder from './Modules/builder.js';
import Cookies from './Modules/cookies.js';
import hostaddress from './Modules/hostaddress.js';
import HeroCard from './Modules/heroCard.js';
import ItemCard from './Modules/itemCard.js';
import DeckCards from './Modules/deckCards.js';

const build = new builder;
const hostadd = new hostaddress;
const cookies = new Cookies;


// arrays of all information to be displayed on the page
const userData = {
    deckData: [],
    heroData: [],
    itemData: []
}

function clearAllItems() {
    const container = document.getElementById('account-content-container');
    container.innerHTML = "";
}

function highlightCurrentTab(tabToHighlight, arrayOfTabs) {
    arrayOfTabs.forEach(element => {
       element.classList.remove('highlighted-tab');
    });

    tabToHighlight.classList.add('highlighted-tab');
}

async function getUserInventoryData() {
    const userId =  cookies.getCookieByName('UserId');
    const url = `${hostadd.address}/UserData/AllUserAccountData/${userId}`
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
        }

    } catch (error) {
       console.error(error.message);
    }
}

function renderMyAccountSettings(parentElement) {
    const cooke = new Cookies;
    const container = build.createDiv();
    parentElement.appendChild(container);

    const username = build.createP(cooke.getCookieByName("Username"), 'User-username');
    container.appendChild(username);

}

function renderUserDecks(parentElement) { 
    const deckCard = new DeckCards;
    const numOfDecks = userData.deckData.length;
    deckCard.renderDeckOptions(parentElement, numOfDecks);

    const createNewDeckBtn = document.getElementById('deck-options-new-id');

    createNewDeckBtn.addEventListener('click', () => { createNewDeck(parentElement) });
}

function createNewDeck(parentElement) {
    const deckCard = new DeckCards;
    deckCard.createNewDeckWindow(parentElement, selectHeroForDeck);
}

function selectHeroForDeck(buttonId) {
    const selectHeroWrapper = document.getElementById('select-hero-wrapper-id');

    renderUserHeroCards(selectHeroWrapper);

    const allInventoryCards = document.querySelectorAll('.hero-inventory-card');

    // implement remove all currently used cards in the deck

    [...allInventoryCards].forEach((card) => {
        card.addEventListener('click', () => {
            const button = document.getElementById(buttonId);
            const buttonParent = build.getParentById(buttonId);

            buttonParent.appendChild(card);
            button.style.display = 'none';

            const removeButton = document.createElement('button');
            removeButton.classList = 'remove-element-button';
            removeButton.innerText = 'Remove Card';

            removeButton.addEventListener('click', () => {
                button.style.display = 'block';
                card.remove();
                removeButton.remove();
            });

            buttonParent.appendChild(removeButton)
        }, { once: true });
    });
}

function renderUserHeroCards(parentElement) {
    userData.heroData.forEach((card, index) => {
        const renderHeroCard = new HeroCard(
            "", // Img goes here
            card.name,
            card.lvl,
            card.currentExp,
            card.nextLvlExp,
            card.class,
            card.strengthStat,
            card.intellegenceStat,
            card.dexterityStat,
            card.wisdomStat,
            "Placeholder", // Create a function to find the item name
        );

        renderHeroCard.renderInventoryHeroCard(parentElement, index);
    });
}

function renderUserItemCards(parentElement) {
    userData.itemData.forEach((card, index) => {
        const renderItemCard = new ItemCard(
            card.imgData, 
            card.name, 
            card.description, 
            card.requiredLvl, 
            "",
            card.strengthMod,
            card.intellegenceMod,
            card.dexterityMod,
            card.wisdomMod
        );

        renderItemCard.renderMiniCard(parentElement, index);
    });
}

const contentContainer = document.getElementById('account-content-container');

const accountBtn = document.getElementById('account-account-list-item');
const decksBtn = document.getElementById('account-decks-list-item');
const heroCardsBtn = document.getElementById('account-heros-list-item');
const itemCardsBtn = document.getElementById('account-items-list-item');

const allTabs = [accountBtn, decksBtn, heroCardsBtn, itemCardsBtn];

accountBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(accountBtn, allTabs);
    renderMyAccountSettings(contentContainer);
    contentContainer.classList = 'account-bg-styles account-container-account-settings roboto-regular';
});

decksBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(decksBtn, allTabs);
    renderUserDecks(contentContainer);
    contentContainer.classList = 'account-bg-styles account-container-decks roboto-regular';
});

heroCardsBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(heroCardsBtn, allTabs);
    renderUserHeroCards(contentContainer);
    contentContainer.classList = 'account-bg-styles account-container-hero-cards roboto-regular';
});

itemCardsBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(itemCardsBtn, allTabs);
    renderUserItemCards(contentContainer);
    contentContainer.classList = 'account-bg-styles account-container-item-cards roboto-regular';
});

window.onload = async () => {
    await getUserInventoryData();
    console.log(userData);
}
