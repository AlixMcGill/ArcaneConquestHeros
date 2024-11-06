export default class generateCards {
    constructor(numCardsToCreate, cardLvlArray) {
        this.numCardsToCreate = numCardsToCreate;
        this.cardLvlArray = cardLvlArray;
        this.averageCardLvl = this.findAverageCardLvl();
        this.generatedCards = [];

        this.cardGeneratorOptions = {
            lvlGenRange: 4,
            maxNumOfTanks: 1,
            maxNumOfSingleClass: 3,
        };
    }

    findAverageCardLvl() {
        let sum;
        let numOfElements = this.cardLvlArray.length;

        for (let i = 0; i < numOfElements; i++) {
            sum += this.cardLvlArray[i];
        }

        const averageCardLvl =  sum / numOfElements;

        return averageCardLvl;
    }

    generateNewCardLevels() {
        let newCardLvls = [];

        for (let i = 0; i < this.numCardsToCreate; i++) {
            let newLvl = this.averageCardLvl + (Math.random() * (2 * this.cardGeneratorOptions.lvlGenRange) - this.cardGeneratorOptions.lvlGenRange);
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
        let returnClasses = [];

        const maxFighterAssassinSorcererWitch = this.cardGeneratorOptions.maxNumOfSingleClass;  // Max occurrences for all classes except True Tank
        const maxAttempts = 10; // Max number of attempts to generate a valid set of classes
        let attemptCount = 0;

        // Determine if "True Tank" should be included (can be changed as needed)
        const includeTrueTank = Math.random() < 0.5; // For example, 50% chance of including "True Tank"

        // Try to generate a valid set of classes up to maxAttempts
        while (attemptCount < maxAttempts) {
            console.log('attempt');
            returnClasses = [];
            const classCounts = {
                "Fighter": 0,
                "True Tank": 0,
                "Sorcerer": 0,
                "Assassin": 0,
                "Witch": 0
            };

            // Optionally include "True Tank" once
            if (includeTrueTank) {
                returnClasses.push("True Tank");
                classCounts["True Tank"]++;
            }

            // Now, generate the remaining classes ensuring no class exceeds the limit
            for (let i = 0; i < this.numCardsToCreate - returnClasses.length; i++) {
                // Choose a random class, but ensure the counts do not exceed the limit
                let validClasses = classes.filter(className => {
                    if (className === "True Tank" && classCounts[className] < 1) return true; // Only allow 1 "True Tank"
                    return className !== "True Tank" && classCounts[className] < maxFighterAssassinSorcererWitch; // Max 3 for others
                });

                if (validClasses.length === 0) {
                    // If no valid class can be chosen, restart the generation process
                    break;
                }

                // Randomly pick a class from the remaining valid options
                const randIndex = Math.floor(Math.random() * validClasses.length);
                const selectedClass = validClasses[randIndex];
                returnClasses.push(selectedClass);
                classCounts[selectedClass]++;
            }

            // Check if the number of generated classes matches the required number
            if (returnClasses.length === this.numCardsToCreate) {
                break; // Success: valid set of classes generated
            }

            attemptCount++;
        }

        if (attemptCount >= maxAttempts) {
            console.error("Failed to generate valid card classes within max attempts.");
        }

        return returnClasses;
    }

    generateCards() {
        const newCardLvls = this.generateNewCardLevels();
        const newCardClasses = this.generateNewCardClasses();

        for (let i = 0; i < this.numCardsToCreate; i++){

            const newCard = {
                lvl: newCardLvls[i],
                class: newCardClasses[i],
            }
            
            this.generatedCards.push(newCard);
        }
    }

    build() {
        this.generateCards();
        return this.generatedCards;
    }
}
