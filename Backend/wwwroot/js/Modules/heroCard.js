export default class renderHeroCard {
    constructor(
        databaseId,
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
        this.databaseId = databaseId;
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
        this.expPercentage = this.cardExp / this.cardExpNextLvl * 100;
    }

    renderMiniCard(parentElement, index) {
        const heroNameClass = 'hero-inventory-name';
        const heroNameId = `hero-inventory-name-${index}`;

        const heroLvlClass = 'hero-inventory-lvl';
        const heroLvlId = `hero-inventory-lvl-${index}`;

        const heroExpNumClass = 'hero-inventory-exp';
        const heroExpNumId = `hero-inventory-exp-${index}`;

        const heroClassClass = 'hero-inventory-class';
        const heroClassId = `hero-inventory-class-${index}`;

        const heroItemHeldClass = 'hero-inventory-item-held';
        const heroItemHeldId = `hero-inventory-item-held-${index}`;

        const heroCardName = document.createElement('p');
        heroCardName.id = heroNameId;
        heroCardName.classList = heroNameClass;
        heroCardName.innerText = this.cardName;

        parentElement.appendChild(heroCardName);

        const heroCardLvl = document.createElement('p');
        heroCardLvl.id = heroLvlId;
        heroCardLvl.classList = heroLvlClass;
        heroCardLvl.innerText = `Lvl: ${this.cardLvl}`;

        parentElement.appendChild(heroCardLvl);

        const heroCardExpNum = document.createElement('p');
        heroCardExpNum.id = heroExpNumId;
        heroCardExpNum.classList = heroExpNumClass;

        if (this.cardExp >= this.cardExpNextLvl) {
            heroCardWrapper.classList.add('hero-card-lvl-up');
            heroCardExpNum.innerText = 'Exp: Lvl Up Availible'
        } else {
            heroCardExpNum.innerText = `Exp: (${this.cardExp}/${this.cardExpNextLvl})`;
        }

        parentElement.appendChild(heroCardExpNum);

        const heroCardClass = document.createElement('p');
        heroCardClass.id = heroClassId;
        heroCardClass.classList = heroClassClass;
        heroCardClass.innerText = `Class: ${this.cardClass}`;

        parentElement.appendChild(heroCardClass);

        const heroCardItemHeld = document.createElement('p');
        heroCardItemHeld.id = heroItemHeldId;
        heroCardItemHeld.classList = heroItemHeldClass;
        heroCardItemHeld.innerText = `Item: ${this.itemHeldName}`;

        parentElement.appendChild(heroCardItemHeld);
    }

    renderInventoryHeroCard(parentElement, index) {
        const wrapperClass = 'hero-inventory-card';
        const wrapperId = `hero-inventory-card-${index}`;

        const heroNameClass = 'hero-inventory-name';
        const heroNameId = `hero-inventory-name-${index}`;

        const heroLvlClass = 'hero-inventory-lvl';
        const heroLvlId = `hero-inventory-lvl-${index}`;

        const heroExpNumClass = 'hero-inventory-exp';
        const heroExpNumId = `hero-inventory-exp-${index}`;

        const heroClassClass = 'hero-inventory-class';
        const heroClassId = `hero-inventory-class-${index}`;

        const heroItemHeldClass = 'hero-inventory-item-held';
        const heroItemHeldId = `hero-inventory-item-held-${index}`;

        const heroCardWrapper = document.createElement('div');
        heroCardWrapper.id = wrapperId;
        heroCardWrapper.classList = wrapperClass;
        heroCardWrapper.setAttribute('database-id', this.databaseId);

        heroCardWrapper.addEventListener('click', () => {
            this.renderFullCard(heroCardWrapper, index);
        });

        const heroCardName = document.createElement('p');
        heroCardName.id = heroNameId;
        heroCardName.classList = heroNameClass;
        heroCardName.innerText = this.cardName;

        heroCardWrapper.appendChild(heroCardName);

        const heroCardLvl = document.createElement('p');
        heroCardLvl.id = heroLvlId;
        heroCardLvl.classList = heroLvlClass;
        heroCardLvl.innerText = `Lvl: ${this.cardLvl}`;

        heroCardWrapper.appendChild(heroCardLvl);

        const heroCardExpNum = document.createElement('p');
        heroCardExpNum.id = heroExpNumId;
        heroCardExpNum.classList = heroExpNumClass;

        if (this.cardExp >= this.cardExpNextLvl) {
            heroCardWrapper.classList.add('hero-card-lvl-up');
            heroCardExpNum.innerText = 'Exp: Lvl Up Availible'
        } else {
            heroCardExpNum.innerText = `Exp: (${this.cardExp}/${this.cardExpNextLvl})`;
        }

        heroCardWrapper.appendChild(heroCardExpNum);

        const heroCardClass = document.createElement('p');
        heroCardClass.id = heroClassId;
        heroCardClass.classList = heroClassClass;
        heroCardClass.innerText = `Class: ${this.cardClass}`;

        heroCardWrapper.appendChild(heroCardClass);

        const heroCardItemHeld = document.createElement('p');
        heroCardItemHeld.id = heroItemHeldId;
        heroCardItemHeld.classList = heroItemHeldClass;
        heroCardItemHeld.innerText = `Item: ${this.itemHeldName}`;

        heroCardWrapper.appendChild(heroCardItemHeld);

        parentElement.appendChild(heroCardWrapper);
    }

    renderFullCard(parentElement, index) {
        const wrapperClass = 'full-hero-inventory-card';
        const wrapperId = `full-hero-inventory-card-${index}`;

        const heroHeaderClass = 'full-hero-inventory-header';
        const heroHeaderId = `full-hero-inventory-header-${index}`;

        const heroNameClass = 'full-hero-inventory-name';
        const heroNameId = `full-hero-inventory-name-${index}`;

        const heroLvlClass = 'full-hero-inventory-lvl';
        const heroLvlId = `full-hero-inventory-lvl-${index}`;

        const heroExpWrapperClass = 'full-hero-inventory-exp-wrapper';
        const heroExpWrapperId = `full-hero-inventory-exp-wrapper-${index}`;

        const heroExpBarClass = 'full-hero-inventory-exp-bar';
        const heroExpBarId = `full-hero-inventory-exp-bar-${index}`;

        const heroExpNumClass = 'full-hero-inventory-exp';
        const heroExpNumId = `full-hero-inventory-exp-${index}`;

        const heroImgClass = 'full-hero-inventory-img';
        const heroImgId = `full-hero-inventory-img-${index}`;
        
        const heroClassClass = 'hero-inventory-class';
        const heroClassId = `hero-inventory-class-${index}`;

        const heroItemHeldClass = 'full-hero-inventory-item-held';
        const heroItemHeldId = `full-hero-inventory-item-held-${index}`;

        const heroStrengthStatClass = 'full-hero-inventory-strength-stat full-hero-inventory-stat';
        const heroStrentgthStatId = `full-hero-inventory-strength-stat-int-id`;

        const heroDexterityStatClass = 'full-hero-inventory-dexterity-stat full-hero-inventory-stat';
        const heroDexteritystatId = `full-hero-invenotry-dexterity-stat-${index}`;

        const heroIntellegenceStatClass = 'full-hero-inventory-intellegence-stat full-hero-inventory-stat';
        const heroIntellegenceStatId = `full-hero-inventory-intellegence-stat-${index}`;

        const heroWisdomStatClass = 'full-hero-inventory-wisdom-stat full-hero-inventory-stat';
        const heroWisdomStatId = `full-hero-inventory-wisdom-stat-${index}`;


        const expPercentage = this.cardExp / this.cardExpNextLvl * 100;


        const heroCardWrapper = document.createElement('div');
        heroCardWrapper.id = wrapperId;
        heroCardWrapper.classList = wrapperClass;
        heroCardWrapper.setAttribute('database-id', this.databaseId);

        //heroCardWrapper.addEventListener('mouseleave', () => {
        //    heroCardWrapper.remove();
        //});

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
        heroCardExpNum.innerText = `Exp: (${this.cardExp}/${this.cardExpNextLvl})`;

        heroCardExpWrapper.appendChild(heroCardExpNum);
        heroCardExpWrapper.appendChild(heroCardExpBar);
        heroCardWrapper.appendChild(heroCardExpWrapper);

        const heroCardImg = document.createElement('img');
        heroCardImg.src = `data:image/png;base64, ${this.img}`;
        heroCardImg.id = heroImgId;
        heroCardImg.classList = heroImgClass;

        heroCardWrapper.appendChild(heroCardImg);

        const heroCardClass = document.createElement('p');
        heroCardClass.id = heroClassId;
        heroCardClass.classList = heroClassClass;
        heroCardClass.innerText = `Class: ${this.cardClass}`;

        heroCardWrapper.appendChild(heroCardClass);

        const heroCardItemHeld = document.createElement('p');
        heroCardItemHeld.id = heroItemHeldId;
        heroCardItemHeld.classList = heroItemHeldClass;
        heroCardItemHeld.innerText = `Item: ${this.itemHeldName}`;

        heroCardWrapper.appendChild(heroCardItemHeld);

        const heroStrengthStat = document.createElement('p');
        heroStrengthStat.id = heroStrentgthStatId;
        heroStrengthStat.classList = heroStrengthStatClass;
        heroStrengthStat.innerText = `Strength: ${this.strengthStat}`;
   
        const heroIntellegenceStat = document.createElement('p');
        heroIntellegenceStat.id = heroIntellegenceStatId;
        heroIntellegenceStat.classList = heroIntellegenceStatClass;
        heroIntellegenceStat.innerText = `Intellegence: ${this.intellegenceStat}`;

        const heroDexterityStat = document.createElement('p');
        heroDexterityStat.id = heroDexteritystatId;
        heroDexterityStat.classList = heroDexterityStatClass;
        heroDexterityStat.innerText = `Dexterity: ${this.dexterityStat}`;

        const heroWisdomStat = document.createElement('p');
        heroWisdomStat.id = heroWisdomStatId;
        heroWisdomStat.classList = heroWisdomStatClass;
        heroWisdomStat.innerText = `Wisdom: ${this.wisdomStat}`;


        if (this.cardExp >= this.cardExpNextLvl) {
            
            const maxStatPoints = 2;
            let statPointsAvalible = 2;

            const incrementIdentifyer = '+';
            const decrementIdentifyer = '-';

            const statPointSpan = document.createElement('span');
            statPointSpan.classList = 'full-hero-inventory-stat-point-span';
            statPointSpan.innerText = statPointsAvalible;

            const updateStatPointSpans = (pointsToUpdate) => {
                const allStatPointSpans = document.querySelectorAll('.full-hero-inventory-stat-point-span');
                [...allStatPointSpans].forEach((span) => {
                    span.innerText = pointsToUpdate;
                });
                //console.log([...allStatPointSpans]);
            }

            // Strength Stat

            const strengthStatWrapper = document.createElement('div');
            strengthStatWrapper.id = `full-hero-inventory-strength-stat-wrapper-id`;
            strengthStatWrapper.classList = 'full-hero-inventory-stat-wrapper full-hero-inventory-strength-stat-wrapper';

            const strengthStatIncButton = document.createElement('button');
            strengthStatIncButton.id = `full-hero-inventory-strength-stat-increment-button-id`;
            strengthStatIncButton.classList = 'full-hero-inventory-increment-button full-hero-inventory-strength-stat-increment-button';
            strengthStatIncButton.innerText = incrementIdentifyer;

            strengthStatIncButton.addEventListener('click', () => {

                if (statPointsAvalible <= 0) return;

                const newStrengthStat = this.strengthStat + 1;
                statPointsAvalible--;

                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;
                
                updateStatPointSpans(statPointsAvalible);

                const strengthStat = document.getElementById(heroStrentgthStatId);
                strengthStat.innerText = `Strength: ${newStrengthStat}`;
                //console.log(strengthStat);
                // trigger reflow
                const triggerReflow =  heroCardWrapper.offsetHeight;
            });

            const strengthStatDecButton = document.createElement('button');
            strengthStatDecButton.id = `full-hero-inventory-strength-stat-decrement-button-id`;
            strengthStatDecButton.classList = 'full-hero-inventory-decrement-button full-hero-inventory-strength-stat-decrement-button';
            strengthStatDecButton.innerText = decrementIdentifyer;

            strengthStatDecButton.addEventListener('click', () => { 
                if (statPointsAvalible <= 0) return;
                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;
            });

            const strengthButtonWrapper = document.createElement('div');
            strengthButtonWrapper.classList = 'full-hero-inventory-button-wrapper';

            strengthButtonWrapper.appendChild(strengthStatDecButton);
            strengthButtonWrapper.appendChild(statPointSpan);
            strengthButtonWrapper.appendChild(strengthStatIncButton);

            strengthStatWrapper.appendChild(heroStrengthStat);
            strengthStatWrapper.appendChild(strengthButtonWrapper);
            heroCardWrapper.appendChild(strengthStatWrapper);

            // Intellegence Stat

            const intellegenceStatWrapper = document.createElement('div');
            intellegenceStatWrapper.id = `full-hero-inventory-intellegence-stat-wrapper-${index}`;
            intellegenceStatWrapper.classList = 'full-hero-inventory-stat-wrapper full-hero-inventory-intellegence-stat-wrapper';

            const intellegenceStatIncButton = document.createElement('button');
            intellegenceStatIncButton.id = `full-hero-inventory-intellegence-stat-increment-button-${index}`;
            intellegenceStatIncButton.classList = 'full-hero-inventory-increment-button full-hero-inventory-intellegence-stat-increment-button';
            intellegenceStatIncButton.innerText = incrementIdentifyer;

            intellegenceStatIncButton.addEventListener('click', () => {
                if (statPointsAvalible <= 0) return;
                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;

                
            });

            const intellegenceStatDecButton = document.createElement('button');
            intellegenceStatDecButton.id = `full-hero-inventory-intellegence-stat-decrement-button-${index}`;
            intellegenceStatDecButton.classList = 'full-hero-inventory-decrement-button full-hero-inventory-intellegence-stat-decrement-button';
            intellegenceStatDecButton.innerText = decrementIdentifyer;

            intellegenceStatDecButton.addEventListener('click', () => {
                if (statPointsAvalible <= 0) return;
                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;
            });

            const intellegenceButtonWrapper = document.createElement('div');
            intellegenceButtonWrapper.classList = 'full-hero-inventory-button-wrapper';

            intellegenceButtonWrapper.appendChild(intellegenceStatDecButton);
            intellegenceButtonWrapper.appendChild(statPointSpan.cloneNode(true));
            intellegenceButtonWrapper.appendChild(intellegenceStatIncButton);

            intellegenceStatWrapper.appendChild(heroIntellegenceStat);
            intellegenceStatWrapper.appendChild(intellegenceButtonWrapper);
            heroCardWrapper.appendChild(intellegenceStatWrapper);

            // Dexterity Stat

            const dexterityStatWrapper = document.createElement('div');
            dexterityStatWrapper.id = `full-hero-inventory-dexterity-stat-wrapper-${index}`;
            dexterityStatWrapper.classList = 'full-hero-inventory-stat-wrapper full-hero-inventory-dexterity-stat-wrapper';

            const dexterityStatIncButton = document.createElement('button');
            dexterityStatIncButton.id = `full-hero-inventory-dexterity-stat-increment-button-${index}`;
            dexterityStatIncButton.classList = 'full-hero-inventory-increment-button full-hero-inventory-dexterity-stat-increment-button';
            dexterityStatIncButton.innerText = incrementIdentifyer;

            dexterityStatIncButton.addEventListener('click', () => {
                if (statPointsAvalible <= 0) return;
                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;
            });

            const dexterityStatDecButton = document.createElement('button');
            dexterityStatDecButton.id = `full-hero-inventory-dexterity-stat-decrement-button-${index}`;
            dexterityStatDecButton.classList = 'full-hero-inventory-decrement-button full-hero-inventory-dexterity-stat-decrement-button';
            dexterityStatDecButton.innerText = decrementIdentifyer;

            dexterityStatDecButton.addEventListener('click', () => {
                if (statPointsAvalible <= 0) return;
                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;
            });

            const dexterityButtonWrapper = document.createElement('div');
            dexterityButtonWrapper.classList = 'full-hero-inventory-button-wrapper';

            dexterityButtonWrapper.appendChild(dexterityStatDecButton);
            dexterityButtonWrapper.appendChild(statPointSpan.cloneNode(true));
            dexterityButtonWrapper.appendChild(dexterityStatIncButton);

            dexterityStatWrapper.appendChild(heroDexterityStat);
            dexterityStatWrapper.appendChild(dexterityButtonWrapper);
            heroCardWrapper.appendChild(dexterityStatWrapper);

            // Wisdom Stat

            const wisdomStatWrapper = document.createElement('div');
            wisdomStatWrapper.id = `full-hero-inventory-wisdom-stat-wrapper-${index}`;
            wisdomStatWrapper.classList = 'full-hero-inventory-stat-wrapper full-hero-inventory-wisdom-stat-wrapper';

            const wisdomStatIncButton = document.createElement('button');
            wisdomStatIncButton.id = `full-hero-inventory-wisdom-stat-increment-button-${index}`;
            wisdomStatIncButton.classList = 'full-hero-inventory-increment-button full-hero-inventory-wisdom-stat-increment-button';
            wisdomStatIncButton.innerText = incrementIdentifyer;

            wisdomStatIncButton.addEventListener('click', () => {
                if (statPointsAvalible <= 0) return;
                if (statPointsAvalible > maxStatPoints) statPointsAvalible = maxStatPoints;
            });

            const wisdomStatDecButton = document.createElement('button');
            wisdomStatDecButton.id = `full-hero-inventory-wisdom-stat-decrement-button-${index}`;
            wisdomStatDecButton.classList = 'full-hero-inventory-decrement-button full-hero-inventory-wisdom-stat-decrement-button';
            wisdomStatDecButton.innerText = decrementIdentifyer;

            wisdomStatDecButton.addEventListener('click', () => {
                if (statPointsAvalible <= 0) return;
            });

            const wisdomButtonWrapper = document.createElement('div');
            wisdomButtonWrapper.classList = 'full-hero-inventory-button-wrapper';

            wisdomButtonWrapper.appendChild(wisdomStatDecButton);
            wisdomButtonWrapper.appendChild(statPointSpan.cloneNode(true));
            wisdomButtonWrapper.appendChild(wisdomStatIncButton);

            wisdomStatWrapper.appendChild(heroWisdomStat);
            wisdomStatWrapper.appendChild(wisdomButtonWrapper);
            heroCardWrapper.appendChild(wisdomStatWrapper);


        } else { 
            heroCardWrapper.appendChild(heroStrengthStat);
            heroCardWrapper.appendChild(heroIntellegenceStat);
            heroCardWrapper.appendChild(heroDexterityStat);
            heroCardWrapper.appendChild(heroWisdomStat);
        }


        parentElement.insertAdjacentElement('afterend', heroCardWrapper);
    }
}
