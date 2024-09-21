import builder from './Modules/builder.js';
import Cookies from './Modules/cookies.js';
import hostaddress from './Modules/hostaddress.js';

const build = new builder;
const hostadd = new hostaddress;
const cookies = new Cookies;

class cardObject {
    constructor(
        heroIcon, 
        name, 
        cardLvl,
        cardExp,
        cardClass,
        strengthStat,
        intellegenceStat,
        dexterityStat,
        wisdomStat,
        itemHeldName
    ) {
        this.heroIcon = heroIcon;
        this.cardName = name;
        this.cardLvl = cardLvl;
        this.cardExp = cardExp;
        this.cardClass = cardClass;
        this.strengthStat = strengthStat;
        this.intellegenceStat = intellegenceStat;
        this.dexterityStat = dexterityStat;
        this.wisdomStat = wisdomStat;
        this.itemHeldName = itemHeldName;
    }

    renderMini() {

    }

    renderFull() {

    }
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
        const cardWrapper = build.withClassCreateDiv(`item-inventory-card-${index}`, "item-inventory-card");
        const cardHeader = build.withClassCreateDiv(`item-inventory-card-header-${index}`, 'item-inventory-card-header');
        const cardName = build.withClassCreateP(card.name, `item-inventory-card-name-${index}`, 'item-inventory-card-name');
        const requiredLvl = build.withClassCreateP(
            `Req Lvl: ${card.requiredLvl}`, `item-inventory-card-reqLvl-${index}`, 'item-inventory-reqLvl');
        cardHeader.appendChild(cardName);
        cardHeader.appendChild(requiredLvl);
        cardWrapper.appendChild(cardHeader);

        const cardDescription = build.withClassCreateP(card.description, 
            `item-inventory-card-description-${index}`, 'item-inventory-card-description');
        cardWrapper.appendChild(cardDescription);

        const strMod = build.withClassCreateP(
            `Strength Mod: ${card.strengthMod}`, `item-inventory-card-strMod-${index}`, 'item-inventory-modifer');
        const intelMod = build.withClassCreateP(
            `Intellegence Mod: ${card.intellegenceMod}`, `item-inventory-card-intMod-${index}`, 'item-inventory-modifer');
        const dexMod = build.withClassCreateP(
            `Dexterity Mod: ${card.dexterityMod}`, `item-inventory-card-dexMod-${index}`, 'item-inventory-modifer');
        const wisMod = build.withClassCreateP(
            `Wisdom Mod: ${card.wisdomMod}`, `item-inventory-card-wisMod-${index}`, 'item-inventory-modifer');
        cardWrapper.appendChild(strMod);
        cardWrapper.appendChild(intelMod);
        cardWrapper.appendChild(dexMod);
        cardWrapper.appendChild(wisMod);

        parentElement.appendChild(cardWrapper);
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
