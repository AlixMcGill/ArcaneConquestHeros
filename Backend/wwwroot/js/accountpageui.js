import builder from './Modules/builder.js';
import Cookies from './Modules/cookies.js';
import hostaddress from './Modules/hostaddress.js';
import HeroCard from './Modules/heroCard.js';
import ItemCard from './Modules/itemCard.js';

const build = new builder;
const hostadd = new hostaddress;
const cookies = new Cookies;


// arrays of all information to be displayed on the page
const allUserInformation = [];
const allUserDecks = [];
const allUserHeroCars = [];
const allUserItemCards = [];


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

function renderMyAccountSettings(parentElement) {
    const cooke = new Cookies;
    const container = build.createDiv();
    parentElement.appendChild(container);

    const username = build.createP(cooke.getCookieByName("Username"), 'User-username');
    container.appendChild(username);

}

async function renderUserDecks() { 
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        if (response.ok) {
        }

    } catch (error) {
       console.error(error.message);
    }
}

function renderUserHeroCards() {

}

async function callApiGetUserItemCards() {
    console.log(cookies.getCookieByName('UserId'))
    const userId =  cookies.getCookieByName('UserId');
    const url = `${hostadd.address}/UserData/ItemCardInventory/${userId}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const ItemCards = await response.json();

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        if (response.ok) {
            return ItemCards;
        }

    } catch (error) {
       console.error(error.message);
    }
}

async function renderUserItemCards(parentElement) {
    let itemcards = await callApiGetUserItemCards();

    await itemcards.forEach((card, index) => {
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
});

decksBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(decksBtn, allTabs);
    renderUserDecks();
});

heroCardsBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(heroCardsBtn, allTabs);
    renderUserHeroCards();
});

itemCardsBtn.addEventListener('click', () => {
    clearAllItems();
    highlightCurrentTab(itemCardsBtn, allTabs);
    renderUserItemCards(contentContainer);
});
