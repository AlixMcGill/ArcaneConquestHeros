export default class cardObject {
    constructor(
        img, 
        name, 
        description,
        cardReqLvl,
        cardClass,
        strengthMod,
        intellegenceMod,
        dexterityMod,
        wisdomMod,
    ) {
        this.img = img;
        this.cardName = name;
        this.description = description;
        this.cardReqLvl = cardReqLvl;
        this.cardClass = cardClass;
        this.strengthMod = strengthMod;
        this.intellegenceMod = intellegenceMod;
        this.dexterityMod = dexterityMod;
        this.wisdomMod = wisdomMod;
    }

    renderMiniCard(parentElement, index) {
        const itemCardWrapper = document.createElement('div');
        itemCardWrapper.id = `item-inventory-card-${index}`;
        itemCardWrapper.classList = "item-inventory-card";

        const itemCardHeader = document.createElement('div');
        itemCardHeader.id = `item-inventory-card-header-${index}`;
        itemCardHeader.classList = 'item-inventory-card-header';

        const itemCardName = document.createElement('p');
        itemCardName.innerText = this.cardName;
        itemCardName.id = `item-inventory-card-name-${index}`;
        itemCardName.classList = 'item-inventory-card-name';

        const itemCardReqLvl = document.createElement('p');
        itemCardReqLvl.innerText = `Req Lvl: ${this.cardReqLvl}`;
        itemCardReqLvl.id = `item-inventory-card-reqLvl-${index}`;
        itemCardReqLvl.classList = 'item-inventory-reqLvl';

        itemCardHeader.appendChild(itemCardName);
        itemCardHeader.appendChild(itemCardReqLvl);
        itemCardWrapper.appendChild(itemCardHeader);

        const itemCardDesc = document.createElement('p');
        itemCardDesc.innerText = this.description;
        itemCardDesc.id = `item-inventory-card-description-${index}`;
        itemCardDesc.classList = 'item-inventory-card-description';

        itemCardWrapper.appendChild(itemCardDesc);

        parentElement.appendChild(itemCardWrapper);
    }

    renderFullCard() {

        const itemCardImg = document.createElement('img');
        itemCardImg.id = `item-inventory-card-img-${index}`;
        itemCardImg.classList = 'item-inventory-img';
        itemCardImg.src = `data:image/png;base64, ${this.img}`;

        itemCardWrapper.appendChild(itemCardImg);
        
        const strMod = build.withClassCreateP(
            `Strength Mod: ${this.strengthMod}`, 
            `item-inventory-card-strMod-${index}`, 'item-inventory-modifer');

        const intelMod = build.withClassCreateP(
            `Intellegence Mod: ${this.intellegenceMod}`, 
            `item-inventory-card-intMod-${index}`, 'item-inventory-modifer');

        const dexMod = build.withClassCreateP(
            `Dexterity Mod: ${this.dexterityMod}`, 
            `item-inventory-card-dexMod-${index}`, 'item-inventory-modifer');

        const wisMod = build.withClassCreateP(
            `Wisdom Mod: ${this.wisdomMod}`, 
            `item-inventory-card-wisMod-${index}`, 'item-inventory-modifer');

        cardWrapper.appendChild(strMod);
        cardWrapper.appendChild(intelMod);
        cardWrapper.appendChild(dexMod);
        cardWrapper.appendChild(wisMod);
    }
}
