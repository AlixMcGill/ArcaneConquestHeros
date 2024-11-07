export default class generateCards {
    constructor(numCardsToCreate, cardLvlArray) {
        this.numCardsToCreate = numCardsToCreate;
        this.cardLvlArray = cardLvlArray;
        this.generatedCards = [];

        this.cardGeneratorOptions = {
            lvlGenRange: 4,
            maxNumOfTanks: 1,
            maxNumOfSingleClass: 4,
            statPointsAwardedPerCardLvl: 3,
        };
    }

    findAverageCardLvl() {
        let sum = 0;
        let numOfElements = this.cardLvlArray.length;
        for (let i = 0; i < numOfElements; i++) {
            sum += this.cardLvlArray[i];
        }

        const averageCardLvl =  sum / numOfElements;

        return averageCardLvl;
    }

    generateNewCardLevels() {
        let newCardLvls = [];
        const averageCardLvl = this.findAverageCardLvl();

        for (let i = 0; i < this.numCardsToCreate; i++) {
            // create a new card level within a range of the average level of the playes card
            let newLvl = Math.floor(averageCardLvl + (Math.random() * (2 * this.cardGeneratorOptions.lvlGenRange) - this.cardGeneratorOptions.lvlGenRange));

            // ensures levels cannot be negative or zero
            if (newLvl < 1) {
                newLvl = 1;
            }

            if (newLvl >= 50) {
                newLvl = 50;
            }

            newCardLvls.push(newLvl);
        }

        if (newCardLvls.length !== this.numCardsToCreate) {
            console.error('The amount of card levels generated does not match the amount of cards called to create');
        }

        return newCardLvls;
    }

    // class generation objectives
    // a deck may only contian one true tank
    // a deck cannot contain all of one class
    generateNewCardClasses() {
        const classes = ["Fighter", "True Tank", "Sorcerer", "Assassin", "Witch"];
        const arr = new Array(this.numCardsToCreate).fill(null);  // Initialize an array with nulls
        const counts = { "Fighter": 0, "True Tank": 0, "Sorcerer": 0, "Assassin": 0, "Witch": 0 };  // track how many times each class appears

        // 50% chance for "True Tank" to appear once
        if (Math.random() < 0.5) {
            const randomIndex = Math.floor(Math.random() * this.numCardsToCreate);
            arr[randomIndex] = "True Tank";  // You can place "True Tank" at any index
            counts["True Tank"] = 1;  // Track that "True Tank" is used
        }

        // Fill the rest of the array with the other classes (excluding "True Tank")
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === null) {  // If the spot is still null
                let randomClass = classes[Math.floor(Math.random() * 5)];

                // Ensure "True Tank" isn't used again, and the other classes cannot appear more than maximum class requirement in options
                while ((randomClass === "True Tank" && counts["True Tank"] === 1) || counts[randomClass] >= this.cardGeneratorOptions.maxNumOfSingleClass) {
                    randomClass = classes[Math.floor(Math.random() * 5)];  // Pick a new class if conditions aren't met
                }

                arr[index] = randomClass;
                counts[randomClass]++;  // Increment the count for the chosen class
            }
        } 
        return arr;
    }

    findStatPoints(cardLvl) {
        // calculates how many points should be allocated to stats per level
        return cardLvl * this.cardGeneratorOptions.statPointsAwardedPerCardLvl;
    }

    generateNewCardStats(statPoints, cardClass) {
        let points = statPoints;
        let statObject = {strength: 0, dexterity: 0, intelligence: 0, wisdom: 0};
        let statProbabilities = null;

        if (cardClass === "Fighter") {
            statProbabilities = {strength: 0.7, dexterity: 0.2, intelligence: 0.1, wisdom: 0}; // fighter
        } else if (cardClass === "True Tank") {
            statProbabilities = {strength: 0.8, dexterity: 0.1, intelligence: 0.1, wisdom: 0}; // True Tank
        } else if (cardClass === "Assassin") {
            statProbabilities = {strength: 0.8, dexterity: 0.1, intelligence: 0.1, wisdom: 0}; // Assassin
        } else if (cardClass === "Sorcerer") {
            statProbabilities = {strength: 0.3, dexterity: 0, intelligence: 0.6, wisdom: 0.1}; // Sorcerer
        } else if (cardClass === "Witch") {
            statProbabilities = {strength: 0.2, dexterity: 0.5, intelligence: 0, wisdom: 0.3}; // Witch
        } else {
            console.error("A valid card class was not entered to find point probability");
            return statObject;
        }

        // distribute points across probabilities
        for (let stat in statProbabilities) {
            statObject[stat] = Math.round(statProbabilities[stat] * points);
        }

        // Make sure total points are balanced (because of rounding)
        let totalAssignedPoints = Object.values(statObject).reduce((sum, value) => sum + value, 0);
        let pointsToAdjust = points - totalAssignedPoints;

        // distribute remaining points
        while (pointsToAdjust !== 0) {
            // Find the stat with the highest probability
            let highestStat = Object.keys(statProbabilities).reduce((a, b) => statProbabilities[a] > statProbabilities[b] ? a : b);
            
            // Adjust the stat with the highest probability
            statObject[highestStat] += pointsToAdjust;
            pointsToAdjust = 0;
        }

        return statObject;
    }

    generateCards() {
        const newCardLvls = this.generateNewCardLevels();
        const newCardClasses = this.generateNewCardClasses();

        for (let i = 0; i < this.numCardsToCreate; i++){
            const avalibleStatPoints = this.findStatPoints(newCardLvls[i]);
            const statObject = this.generateNewCardStats(avalibleStatPoints, newCardClasses[i]);

            const newCard = {
                lvl: newCardLvls[i],
                class: newCardClasses[i],
                strength: statObject.strength,
                dexterity: statObject.dexterity,
                intelligence: statObject.intelligence,
                wisdom: statObject.wisdom
            }
            
            this.generatedCards.push(newCard);
        }
    }

    build() {
        this.generateCards();
        return this.generatedCards;
    }
}
