import builder from './Modules/builder';
import Cookies from './Modules/cookies';
import hostaddress from './Modules/hostaddress';
import HeroCard from './Modules/heroCard';
import ItemCard from './Modules/itemCard';
import DeckCards from './Modules/deckCards';

const build = new builder('');
const hostadd = new hostaddress;
const cookies = new Cookies;

interface HeroCards {
    id: string;
    img: string;
    name: string;
    lvl: number;
    currentExp: number;
    nextLvlExp: number;
    class: string;
    strengthStat: number;
    intellegenceStat: number;
    dexterityStat: number;
    wisdomStat: number;
    itemName: string;
};

interface ItemCards {
    id: string;
    imgData: string;
    name: string;
    description: string;
    requiredLvl: number;
    classRequired: string;
    strengthMod: number;
    intellegenceMod: number;
    dexterityMod: number;
    wisdomMod: number;
};

// arrays of all information to be displayed on the page
const userData = {
    deckData: [],
    heroData: [] as HeroCards[],
    itemData: [] as ItemCards[]
}

function clearAllItems() {
    const container = document.getElementById('account-content-container');
    container.innerHTML = "";
}

function highlightCurrentTab(tabToHighlight: any, arrayOfTabs: any) {
    arrayOfTabs.forEach((element: any) => {
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

function renderMyAccountSettings(parentElement: any) {
    const cooke = new Cookies;
    const container = build.createDiv();
    parentElement.appendChild(container);

    const username = build.createP(cooke.getCookieByName("Username"), 'User-username');
    container.appendChild(username);

}

function renderUserDecks(parentElement: any) { 
    const deckCard = new DeckCards;
    const numOfDecks = userData.deckData.length;
    deckCard.renderDeckOptions(parentElement, numOfDecks);

    const createNewDeckBtn = document.getElementById('deck-options-new-id');

    createNewDeckBtn.addEventListener('click', () => { createNewDeck(parentElement) });
}

function createNewDeck(parentElement: any) {
    const deckCard = new DeckCards;
    deckCard.createNewDeckWindow(parentElement, selectHeroForDeck);
    newDeckData();
}

function selectHeroForDeck(buttonId: string) {
    const selectHeroWrapper = document.getElementById('select-hero-wrapper-id');

    renderUserHeroCards(selectHeroWrapper);

    const allInventoryCards = document.querySelectorAll('.hero-inventory-card');

    // implement remove all currently used cards in the deck

    [...allInventoryCards].forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.add('hero-card-deck');

            const button = document.getElementById(buttonId);
            const buttonParent = build.getParentById(buttonId);

            buttonParent.appendChild(card);
            button.style.display = 'none';

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-element-button';
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

function newDeckData() {
    try {
        const deckLength = 10;
        const createDeck = document.getElementById('create-deck-button-id');
        const deckName = document.getElementById('create-new-deck-name-id').value;
        const deckDescription = document.getElementById('create-new-deck-description-id').value;

        createDeck.addEventListener('click', () => {
            const newDeckDataObj = grabNewDeckData(deckLength, deckName, deckDescription);
            console.log(newDeckDataObj);
        });
    } catch (error) {
       console.error(error.message);
    }
}

function grabNewDeckData(deckLength, deckName, deckDescription) {
    const heroCardInDeck = document.querySelectorAll('.hero-card-deck');
    const allDeckCards = [...heroCardInDeck];

    if (allDeckCards.length != deckLength) {
        throw new Error(`${allDeckCards.length} number of cards in deck is not allowed`);
    } else {
        return {
            deckName: deckName,
            deckDescription: deckDescription,
            heroCardOne: parseInt(allDeckCards[0].getAttribute('database-id')),
            heroCardTwo: parseInt(allDeckCards[1].getAttribute('database-id')),
            heroCardThree: parseInt(allDeckCards[2].getAttribute('database-id')),
            heroCardFour: parseInt(allDeckCards[3].getAttribute('database-id')),
            heroCardFive: parseInt(allDeckCards[4].getAttribute('database-id')),
            heroCardSix: parseInt(allDeckCards[5].getAttribute('database-id')),
            heroCardSeven: parseInt(allDeckCards[6].getAttribute('database-id')),
            heroCardEight: parseInt(allDeckCards[7].getAttribute('database-id')),
            heroCardNine: parseInt(allDeckCards[8].getAttribute('database-id')),
            heroCardTen: parseInt(allDeckCards[9].getAttribute('database-id')),
        };
    }            
}

async function postNewDeckData() {
    const userId =  cookies.getCookieByName('UserId');
    const url = `${hostadd.address}/UserData/AllUserAccountData/${userId}`

    try {
        
    } catch (error) {
       console.error(error.message);
    }
}

function renderUserHeroCards(parentElement: any) {
    userData.heroData.forEach((card, index) => {
        const renderHeroCard = new HeroCard(
            card.id,
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
            "Placeholder", // Create a function to find and return the item name
        );

        renderHeroCard.renderInventoryHeroCard(parentElement, index);
    });
}

function renderUserItemCards(parentElement: any) {
    userData.itemData.forEach((card, index) => {
        const renderItemCard = new ItemCard(
            card.id,
            card.imgData, 
            card.name, 
            card.description, 
            card.requiredLvl, 
            "", // item card class requirement
            card.strengthMod,
            card.intellegenceMod,
            card.dexterityMod,
            card.wisdomMod
        );

        renderItemCard.renderMiniCard(parentElement, index);
    });
}

const contentContainer = document.getElementById('account-content-container') as HTMLElement;

const accountBtn = document.getElementById('account-account-list-item');
const decksBtn = document.getElementById('account-decks-list-item');
const heroCardsBtn = document.getElementById('account-heros-list-item');
const itemCardsBtn = document.getElementById('account-items-list-item');

const allTabs = [accountBtn, decksBtn, heroCardsBtn, itemCardsBtn];

if (accountBtn){
    accountBtn.addEventListener('click', () => {
        clearAllItems();
        highlightCurrentTab(accountBtn, allTabs);
        renderMyAccountSettings(contentContainer);
        if (contentContainer) { 
            contentContainer.className = 'account-bg-styles account-container-account-settings roboto-regular';
        }
    });
} else {
    console.error('the account button does not exsit');
}

if (decksBtn) {
    decksBtn.addEventListener('click', () => {
        clearAllItems();
        highlightCurrentTab(decksBtn, allTabs);
        renderUserDecks(contentContainer);
        contentContainer.className = 'account-bg-styles account-container-decks roboto-regular';
    });
} else {
    console.error('the decks button does not exsit');
}

if (heroCardsBtn) {
    heroCardsBtn.addEventListener('click', () => {
        clearAllItems();
        highlightCurrentTab(heroCardsBtn, allTabs);
        renderUserHeroCards(contentContainer);
        contentContainer.className = 'account-bg-styles account-container-hero-cards roboto-regular';
    });
} else {
    console.error('the hero card button does not exsit');
}

if (itemCardsBtn) {
    itemCardsBtn.addEventListener('click', () => {
        clearAllItems();
        highlightCurrentTab(itemCardsBtn, allTabs);
        renderUserItemCards(contentContainer);
        contentContainer.className = 'account-bg-styles account-container-item-cards roboto-regular';
    });
} else {
    console.error('the item card button does not exsit');
}

window.onload = async () => {
    await getUserInventoryData();
    console.log(userData); // remove this later when not useful
}
