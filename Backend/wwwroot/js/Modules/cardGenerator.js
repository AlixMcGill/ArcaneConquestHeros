export default class generateCards {
    constructor(numCardsToCreate, cardLvlArray) {
        this.numCardsToCreate = numCardsToCreate;
        this.cardLvlArray = cardLvlArray;
        this.averageCardLvl = this.findAverageCardLvl();
        this.generatedCards = [];

        this.cardGeneratorOptions = {
            lvlGenRange: 4,
            maxNumOfTanks: 1,
            maxNumOfSingleClass: 4,
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
        console.log(arr);
        return arr;
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
