import builder from './Modules/builder.js';
import Cookies from './Modules/cookies.js';
import hostaddress from './Modules/hostaddress.js';

const build = new builder;
const hostadd = new hostaddress;

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
            window.location.href = `${hostadd.address}/login.html`
        }

    } catch (error) {
       console.error(error.message);
    }
}

function renderUserHeroCards() {

}

function renderUserItemCards() {

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
    renderUserItemCards();
});
