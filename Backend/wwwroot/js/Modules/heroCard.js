export default class renderHeroCard {
    constructor(
        heroImg, 
        name, 
        cardLvl,
        cardExp,
        cardExpNextLvl,
        cardClass,
        strengthStat,
        intellegenceStat,
        dexterityStat,
        wisdomStat,
        itemHeldName
    ) {
        this.heroImg = heroImg;
        this.cardName = name;
        this.cardLvl = cardLvl;
        this.cardExp = parseInt(cardExp);
        this.cardExpNextLvl = parseInt(cardExpNextLvl);
        this.cardClass = cardClass;
        this.strengthStat = strengthStat;
        this.intellegenceStat = intellegenceStat;
        this.dexterityStat = dexterityStat;
        this.wisdomStat = wisdomStat;
        this.itemHeldName = itemHeldName; 
    }

    renderInventoryHeroCard(parentElement, index) {
        const wrapperClass = 'hero-inventory-card';
        const wrapperId = `hero-inventory-card-${index}`;

        const heroHeaderClass = 'hero-inventory-header';
        const heroHeaderId = `hero-inventory-header-${index}`;

        const heroNameClass = 'hero-inventory-name';
        const heroNameId = `hero-inventory-name-${index}`;

        const heroLvlClass = 'hero-inventory-lvl';
        const heroLvlId = `hero-inventory-lvl-${index}`;

        const heroExpWrapperClass = 'hero-inventory-exp-wrapper';
        const heroExpWrapperId = `hero-inventory-exp-wrapper-${index}`;

        const heroExpBarClass = 'hero-inventory-exp-bar';
        const heroExpBarId = `hero-inventory-exp-bar-${index}`;

        const heroExpNumClass = 'hero-inventory-exp';
        const heroExpNumId = `hero-inventory-exp-${index}`;

        const heroImgClass = 'hero-inventory-img';
        const heroImgId = `hero-inventory-img-${index}`;

        const heroItemHeldClass = 'hero-inventory-item-held';
        const heroItemHeldId = `hero-inventory-item-held-${index}`;


        const expPercentage = this.cardExp / this.cardExpNextLvl * 100;


        const heroCardWrapper = document.createElement('div');
        heroCardWrapper.id = wrapperId;
        heroCardWrapper.classList = wrapperClass;

        const heroCardHeader = document.createElement('div');
        heroCardHeader.id = heroHeaderId;
        heroCardHeader.classList = heroHeaderClass;

        const heroCardName = document.createElement('p');
        heroCardName.id = heroNameId;
        heroCardName.classList = heroNameClass;
        heroCardName.innerText = this.cardName;

        const heroCardLvl = document.createElement('p');
        heroCardLvl.id = heroLvlId;
        heroCardLvl.classList = heroLvlClass;
        heroCardLvl.innerText = `Lvl: ${this.cardLvl}`;

        heroCardHeader.appendChild(heroCardName);
        heroCardHeader.appendChild(heroCardLvl);
        heroCardWrapper.appendChild(heroCardHeader);

        const heroCardExpWrapper = document.createElement('div');
        heroCardExpWrapper.id = heroExpWrapperId;
        heroCardExpWrapper.classList = heroExpWrapperClass;

        const heroCardExpBar = document.createElement('div');
        heroCardExpBar.style.width = `${expPercentage}%`;
        heroCardExpBar.style.left = '0';
        heroCardExpBar.id = heroExpBarId;
        heroCardExpBar.classList = heroExpBarClass;

        const heroCardExpNum = document.createElement('p');
        heroCardExpNum.id = heroExpNumId;
        heroCardExpNum.classList = heroExpNumClass;
        heroCardExpNum.innerText = `(${this.cardExp}/${this.cardExpNextLvl})`;

        heroCardExpWrapper.appendChild(heroCardExpNum);
        heroCardExpWrapper.appendChild(heroCardExpBar);
        heroCardWrapper.appendChild(heroCardExpWrapper);

        const heroCardImg = document.createElement('img');
        heroCardImg.src = `data:image/png;base64, ${this.img}`;
        heroCardImg.id = heroImgId;
        heroCardImg.classList = heroImgClass;

        heroCardWrapper.appendChild(heroCardImg);

        const heroCardItemHeld = document.createElement('p');
        heroCardItemHeld.id = heroItemHeldId;
        heroCardItemHeld.classList = heroItemHeldClass;
        heroCardItemHeld.innerText = `Item: ${this.itemHeldName}`;

        heroCardWrapper.appendChild(heroCardItemHeld);

        parentElement.appendChild(heroCardWrapper);
    }
}
