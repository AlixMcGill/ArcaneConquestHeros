export default class generateCards {
    numCardsToCreate: number;
    cardLvlArray: number[];
    generatedCards: object[];
    cardGeneratorOptions: object;
    classes: object;
    types: object;

    constructor(numCardsToCreate: number, cardLvlArray: number[]) {
        this.numCardsToCreate = numCardsToCreate;
        this.cardLvlArray = cardLvlArray;
        this.generatedCards = [];

        this.cardGeneratorOptions = {
            lvlGenRange: 4,
            itemLvlGenRange: 3,
            maxNumOfTanks: 1,
            maxNumOfSingleClass: 4,
            statPointsAwardedPerCardLvl: 3,
            modPointsAwarderPerItemLvl: 2, // if this is changed item stats must be modified
        };

        this.classes = {
            fighter: "Fighter",
            assassin: "Assassin",
            sorcerer: "Sorcerer",
            trueTank: "True Tank",
            witch: "Witch"
        };

        this.types = {
            bludgeoning: "Bludgeoning",
            pericing: "Pericing",
            constriction: "Constriction",
            lightning: "Lightning",
            frost: "Frost",
            fire: "Fire",
            Poison: "Poison",
            sheild: "Sheild",
            lifeLink: "Life Link",
            radient: "Radient",
        };
    }

    // finds the average level of all player cards in currently selected deck
    findAverageCardLvl() {
        let sum = 0;
        let numOfElements = this.cardLvlArray.length;
        for (let i = 0; i < numOfElements; i++) {
            sum += this.cardLvlArray[i];
        }

        const averageCardLvl =  sum / numOfElements;

        return averageCardLvl;
    }


    //   ----------   hero card properties generation   ----------


    // creates an array of card levels based on the average card level of all player cards in current deck
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

    // finds how many stat points to be allocated by level
    findStatPoints(cardLvl) {
        // calculates how many points should be allocated to stats per level
        return cardLvl * this.cardGeneratorOptions.statPointsAwardedPerCardLvl;
    }

    // calculates hero card stats based on probabilites of each class
    // should impliments some randomness later
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

    // assigns a random name from specified list to hero card by class
    generateCardNames(cardClass) {
        const nameArchive = {
            fighter: ["Iron Fist", "The Destroyer", "Shadow Strike", "Blaze Fury", "Thunderclap", "Mighty Titan", "Steel Viper", "Crimson Wolf", "Raging Bull", "The Phantom", "Nightmare", "Viper King", "Black Panther", "Rampage", "Hurricane", "Iron Hammer", "The Predator", "Wolfheart", "Savage Beast", "Thunderstorm", "Venomous Fang", "Golden Dragon", "Dark Phoenix", "King Cobra", "Silver Bullet", "Gladiator", "Venomous Vixen", "Tornado", "Red Widow", "Blaze Warrior", "Talon", "Berserker", "Stone Fist", "Hellhound", "Rogue Knight", "Sledgehammer", "Stormbringer", "Fury", "Steel Serpent", "Dragon Slayer", "Viking Rage", "Silver Wolf", "Scorpion King", "Vortex", "Hellfire", "Titanus", "The Warlord", "Steel Titan", "Eagle Eye", "Frostbite", "Shadow Fury", "Iron Beast", "Crimson Reaper", "Doomsday", "King of the Ring", "Thunderstrike", "Reaper", "Deadshot", "Blackout", "Inferno", "Wolfbane", "Valkyrie", "Bloodhound", "The Hammer", "Night Wolf", "Ravenous", "Stormrage", "Savage Fury", "Hellraiser", "Lone Wolf", "Iron Wolf", "Shadow Phantom", "Cobra Commander", "The Juggernaut", "Raging Storm", "Maverick", "The Beast", "Savage Hawk", "Bonecrusher", "Black Knight", "Dark Knight", "Silver Storm", "The Phoenix", "Dragon King", "Red Dragon", "Blaze King", "Mammoth", "King of Fury", "Infernal Flame", "Hellstorm", "The Vindicator", "Thunder Fury", "Venom Strike", "Battle Hawk", "Crimson Storm", "Raging Rhino", "Dreadnought", "Celtic Warrior", "Bounty Hunter", "Stormcloud", "Wolf Slayer", "Lightning Strike", "Titan Fury", "The Guardian", "Ironclad", "Wild Beast", "Steel Dragon", "Night Demon", "Crimson Fury", "Viper Strike", "Shadow Talon", "Giant Slayer", "Reckoning", "Warrior Spirit", "Vengeful Hunter", "The Butcher", "Black Widow", "Titan Slayer", "Steel Hammer", "The Tyrant", "Dragon Claw", "Deathbringer", "Berserk Fury", "Iron Reaper", "Battleborn", "Shadow Claw", "Viking Warrior", "Night Stalker", "Thunder Viper", "Ghost Warrior"],
            trueTank: ["Iron Juggernaut", "Steel Titan", "Raging Colossus", "The Behemoth", "War Machine","Thunder Strike", "Fortress of Steel", "The Warlord", "Armageddon", "The Goliath","Heavy Hitter", "Doom Bringer", "The Anvil", "Ironclad", "The Bastion","Battle Fortress", "Titan Reaver", "The Sentinel", "Oblivion", "The Wall","Hardened Titan", "Warhammer", "The Juggernaut", "Steel Beast", "Crimson Tank","Grim Sentinel", "Stonebreaker", "Iron Guardian", "Rampart", "Battlecrusher","Thunderstorm", "Vanguard", "Molten Fury", "The Overlord", "The Destroyer","Steel Titaness", "Earthshaker", "Deathbringer", "Fury of the Iron Beast", "Reckoning","The Citadel", "Heavy Reaver", "Colossus of War", "Titan Slayer", "Grim Reaper","Inferno", "Beast of the Battlefield", "Thunderclap", "King of the Trenches", "The Barricade","Ravager", "Hellfire", "The Fortress", "Warlord", "Shockwave","Iron Vulture", "The Iron Beast", "Doomsday", "Onyx Guardian", "The Rampart","Grizzly Tank", "Steel Barricade", "The Sledgehammer", "The Unbreakable", "Vortex","Black Hawk", "Titanic Might", "Iron Thunder", "Ragnarok", "The Tempest","Warrior's Shield", "The Leviathan", "Stormbringer", "Giant of Steel", "Hellstorm","Crimson Knight", "Iron Warden", "Viking Fortress", "The Iron Wall", "The Golem","Bastion of Power", "Steel Paladin", "Dreadnought", "Obsidian Beast", "The Iron Wall","Rampaging Iron", "The Invincible", "Battlecruiser", "Heavy Assault", "Titan Shield","Cobalt Reaper", "Tank Destroyer", "Victory's Hammer", "The Titanfall", "Warbringer","Unstoppable Force", "Crimson Fury", "Molten Titan", "Fist of Steel", "The Crusher","Thunderhammer", "Shadow Fortress", "Reinforced Steel", "Guardian of Steel", "Battle Titan","Scorched Earth", "Blackout", "Siege Master", "Iron Thunderbolt", "Goliath Reborn","Stone Titan", "Victory Tank", "Tactical Juggernaut", "Fury of Steel", "Iron Wrath","The Onslaught", "Invincible Fortress", "Devastator", "Rampart Guardian", "Siege Machine","Thunder Titan", "Crimson Barricade", "Oblivion Tank", "The Iron Bulwark", "Stormbringer","Wrecking Ball", "Armored Beast", "The Exterminator", "Blaze of Steel", "Imperial Guardian"],
            sorcerer: ["Azrael Shadowmancer", "Selena Darkweaver", "Malachai the Flamebinder", "Ezra Nightwhisper", "Thalindra Stormcaller","Korath the Mystic", "Vespera Moonshade", "Darian Darkflame", "Eryndor the Eternal", "Lyra Starweaver","Zoltar the Enchanter", "Veldris Doombringer", "Kaldar Frostborn", "Seraphina Nightbloom", "Mordekai the Undying","Ithara Voidcaller", "Eldrin Shadowcaster", "Arden Flameweaver", "Riven Darkstorm", "Talindra Duskwhisper","Elowen Bloodmage", "Azrak the Black", "Caelus Frostbringer", "Nyx Shadowbane", "Valthor the Wise","Althira Dreamweaver", "Maeloth Stormweaver", "Ravenn Darkseer", "Viona Emberheart", "Kiroth Voidseeker","Ravenna the Unseen", "Thalor Thunderheart", "Ilara Frostweaver", "Jareth Nightbloom", "Amara Darkspell","Xerath the Sorrowspeaker", "Kynthar Voidwhisper", "Drakar Flamebinder", "Sorilith Shadowsoul", "Xelena Moonfire","Vorneth Bloodthorn", "Azraek Stormbinder", "Kaelen the Cursed", "Illyria Flameheart", "Vorath Shadowmancer","Elyndra Dawnbringer", "Caldor Blackstone", "Aleron the Arcane", "Fennar Nightshade", "Istrath Flameweaver","Zanara Darkflame", "Vekith the Eternal", "Vornai Frostmantle", "Nerath Doomwhisper", "Sylas Stormrider","Rylena Shadowmist", "Kornis Bloodweaver", "Thalon Voidcaster", "Taliyah Nightfire", "Kaldar the Dreaded","Lyrianne Emberveil", "Ishara Stonewaker", "Aldrith Shadowbane", "Eryndor the Eternal Flame", "Orynn the Seer","Kessiah Nightshroud", "Drathir Flamecaller", "Zerina Stormsinger", "Mirek the Shadowblade", "Ashra the Lurker","Yveline Voidcaller", "Belathar Emberstorm", "Valthras Nightweaver", "Azra Darkflame", "Tybros Shadowforge","Alina Mistbinder", "Kaedric Frostveil", "Velora Sunshard", "Raelon the Vengeful", "Korath Darkwater","Lysandra Bloodshroud", "Orion Darkflare", "Morrigan Spellbinder", "Zorath Moonshadow", "Kharis the Cursed","Eira Darkweaver", "Vesper the Sorceress", "Aelric Stormshroud", "Nyra Shadowwhisper", "Zaelus Firestorm","Vysira Blackthorn", "Nerathis the Forsaken", "Xanara Nightstorm", "Ithros the Fallen", "Ferinth Bloodcaster","Tyris Emberseeker", "Karnith Shadowflame", "Damaris Frostweaver", "Valrith Stormbreaker", "Selina Deathwhisper","Xarath the Cold", "Yavira Darkspell", "Caladir Moonmist", "Thyra Stormwhisper", "Voriath the Eldritch","Kaedra Nightfire", "Lorel Darkcaster", "Astraea Shadowbinder", "Valithra Embercaller", "Kallius the Shattered","Lirien the Dreamtouched", "Cindar Moonshroud", "Jareth Fireweaver", "Saroth Voidmancer", "Ivara Shadowrune","Rhael Nightbringer", "Sorith the Arcane", "Quillan the Stormlord", "Amelith Voidflare", "Caelin the Illusionist","Vorael Flamebinder", "Rhanor the Dark", "Zahira Frostwhisper", "Thalion Sorrowsinger", "Astrid the Black","Kerath Doomshadow", "Zariel the Warlock", "Ysolde Windstrider", "Yarion the Mistweaver", "Krisar the Shadowflame"],
            assassin:["Darius Nightblade", "Vesper Shadowstrike", "Kaelen Blackthorn", "Selena Deathwhisper", "Riven Darkblade","Zara Bloodfang", "Neroth Silentstrike", "Lira Shadowdancer", "Jareth Viperbane", "Maelis Ghostblade","Korin Nightshade", "Azara Silentfang", "Xerath Blackwing", "Elysia Frostshadow", "Varnak Daggerstrike","Nyla Bloodshade", "Sorin Darkmourn", "Vira Thornstrike", "Ravenn Duskfall", "Zarek Doomblade","Thalira the Silent", "Quinn Nightstalker", "Kairos Shadowveil", "Ishara Venombite", "Dorian Shadowclaw","Lorian Blackcloak", "Marek the Silent", "Vyxen Nightthorn", "Renna Ashenfang", "Vorath Vileblade","Darieth Steelfang", "Sylas Darkthorn", "Raena Silentwhisper", "Korben Shadowfang", "Elara Nightstrike","Talon Darkraven", "Xenith the Ghost", "Vora Shadeclaw", "Lysander Quickblade", "Sylva Stormshadow","Raith Silverfang", "Nalia Shadowthorn", "Rovan Daggerwhisper", "Kaelen Nightflame", "Ashira Bloodshade","Vexor the Dagger", "Corven Blackshade", "Rhydan Silentblade", "Vysandra Silentwhisper", "Coraline Ravenclaw","Thorne Shadowstrike", "Yara Darkfang", "Zanthe Nightfall", "Lerith the Vile", "Krogar Shadebringer","Rhiannon Darkwhisper", "Orion Stealthstrike", "Kirel Venomsoul", "Ashlan Darkmist", "Zorath Silentvenom","Rylana Nightbloom", "Thalor Darkheart", "Draekor Bloodraven", "Kira Silentfang", "Sorin the Phantom","Calia Nightflame", "Narath the Unseen", "Lysa Ghostfang", "Thalrik Blackreaver", "Kallan Silentshroud","Vera Blackstrike", "Talon Shadowpiercer", "Korrin the Whisperer", "Yveline Nightshade", "Threx Shadowhand","Lucan Vileclaw", "Rylen Bloodstrike", "Vexis Nightshadow", "Ilira Silentstrike", "Vash the Dagger","Khalos Bloodthorn", "Theron Nightclaw", "Lirael Darkstrike", "Zared the Shadow", "Darius Venomfang","Nyx Shadowveil", "Harkon Darkfire", "Kaya Venomshadow", "Vallor Blackfang", "Silas Darkweaver","Kaden Nightblade", "Thalindra Shadeweaver", "Eroth Silentbloom", "Naomi Nightwhisper", "Korr Blackveil","Lysandra Shadeclaw", "Xyren Darkthorn", "Dorian Shadowpierce", "Maelis Shadowbane", "Ciran Silentstrike","Talia Bloodveil", "Ravok Shadowfury", "Yven Nightshade", "Talon Blackmist", "Elandra Daggerheart","Zethros Silentwind", "Lena Darkstorm", "Oris Ghostblade", "Raelynn Nightstrike", "Talek Silentclaw","Zariel Venombite", "Kaltor Nightshroud", "Ravanna Shadowfire", "Xirith Silentblade", "Zerek Dreadfang","Elara Shadowmist", "Thalor Nightstalker", "Kayn the Silent", "Lucian Blackthorn", "Asha Darkshroud","Thyra Bloodveil", "Raen Nightreaver", "Korin Ghostveil", "Tyris the Silent", "Ashryn Shadowflame","Valthor Blackstrike", "Vira Shadowseeker", "Karin Bloodstrike", "Orin Nightfall", "Cale Silentfang"],
            witch: ["Elowen Nightshade", "Seraphina Darkmoon", "Morwen Stormrune", "Vespera Blackthorn", "Lilith Shadowcaster","Isolde Moonfire", "Nyx Shadowthorn", "Selena Bloodmoon", "Mirabel Ravenshadow", "Thalindra Voidwhisper","Violet Thornspell", "Zara Dreamweaver", "Eldora Grimmoon", "Maelis Dreadveil", "Fiora Witchstorm","Astrid Darkflame", "Morrigan Stormbringer", "Rhiannon Silverthorn", "Bellatrix Nightshade", "Cassandra Wildflame","Seraphina Stormborn", "Elira Nightbloom", "Lorelei Cinderheart", "Brielle Moonshadow", "Nyra Shadowmist","Sable Blackrose", "Celandine Shadowveil", "Thyra Nightwind", "Eira Stormraven", "Hecate Bloodrose","Ophelia Darkthorn", "Althea Frostbite", "Ysolde Nightwhisper", "Zarael Stormweaver", "Calista Soulfire","Morwenna Duskflare", "Selene Emberstorm", "Adara Darkmoon", "Viona Moonshroud", "Keziah Bloodveil","Ravenna Darkwraith", "Aveline Stormrune", "Calyx Ashenheart", "Ishara Frostveil", "Vespera Wraithborn","Elara Blackthorn", "Tamsin Ravencloak", "Isolde Moonthorn", "Selina Nightfire", "Zinnia Thornrune","Sylvia Darkrune", "Eris Shadowflame", "Yvaine Blackwood", "Thalira Silvermist", "Amara Grimthorn","Lilith Shadowgrace", "Nymeria Doomweaver", "Solara Frostmourn", "Freya Witchborne", "Cassandra Ashfall","Venora Darkfury", "Aradia Stormshadow", "Thessa Nightshroud", "Gwyneth Bloodmoon", "Eryndra Blackflame","Veda Nightbloom", "Nerissa Darkthorn", "Anwen Emberfall", "Astraea Voidstorm", "Valkira Nightblight","Ciriella Stormveil", "Ira Darkmist", "Dalia Ravenflame", "Zeraphine Shadowthorn", "Mirella Bloodthorn","Hecatia Silentmoon", "Ivy Darkrose", "Kendra Grimmoon", "Liora Ashenveil", "Venessa Dreadshadow","Morwen Dreadheart", "Maelis Shadowburn", "Verael Blackstone", "Valora Stormfury", "Raven Darkweaver","Cecilia Emberbloom", "Zabrina Nightfury", "Marilla Stormshade", "Selene Froststrike", "Rowena Bloodshade","Gwynna Darkbloom", "Livia Shadowflame", "Adelina Stormcloak", "Elda Firethorn", "Nora Witchbane","Thea Nightshadow", "Gwyneira Moonshadow", "Lucina Darkheart", "Mirian Shadowthorn", "Elaura Soulfire","Ismene Nightfall", "Liria Bloodwind", "Thalindra Darkflame", "Astrid Duskveil", "Sable Emberthorn","Aurelia Frostmoon", "Calista Thornshade", "Elspeth Witchfire", "Seraphina Shadowweaver", "Lilith Veilcaster","Ashira Stormweaver", "Sybil Bloodmoon", "Neritha Darkveil", "Azalea Blackthorn", "Mireille Ghostflame","Alvina Shadowdance", "Cassandra Wraithcaller", "Violetta Darkwind", "Aradia Dreamweaver", "Celeste Nightwhisper","Morgana Soulcaster", "Selina Doomweaver", "Thalina Emberstorm", "Iskra Blackveil", "Zara Nightshade","Lorelei Darkmoon", "Maris Nightcaller", "Kassandra Stormfury", "Elira Voidfire", "Ophelia Nightclaw"] 
        }
        
        // selects a random index out of a specified array length
        function genrand(arraylength) {
            return Math.floor(Math.random() * arraylength);
        }

        if (cardClass === "Fighter") {
            return nameArchive.fighter[genrand(nameArchive.fighter.length)];
        } else if (cardClass === "True Tank") {
            return nameArchive.trueTank[genrand(nameArchive.trueTank.length)];
        } else if (cardClass === "Sorcerer") {
            return nameArchive.sorcerer[genrand(nameArchive.sorcerer.length)];
        } else if (cardClass === "Assassin") {
            return nameArchive.assassin[genrand(nameArchive.assassin.length)];
        } else if (cardClass === "Witch") {
            return nameArchive.witch[genrand(nameArchive.witch.length)];
        } else {
            console.error("A valid class was not passed to return a random card name");
            return null;
        }
    }

    generateActions() {
        return Math.floor(Math.random() * 2) + 1;
    }

    generateVitality(heroClass, heroCardStr, itemCardStr, heroCardLvl) {
        let baseHealth = 100;

        if (heroClass === this.classes.fighter) {
            baseHealth = 150;
        } else if (heroClass === this.classes.trueTank) {
            baseHealth = 250;
        } else if (heroClass === this.classes.assassin) {
            baseHealth = 100;
        } else if (heroClass === this.classes.witch) {
            baseHealth = 80;
        } else if (heroClass === this.classes.sorcerer) {
            baseHealth = 70;
        }

        const vitality = (baseHealth + heroCardStr + itemCardStr) * heroCardLvl;
        return vitality;
    }


    //   ----------   item card properties generation   ----------


    generateItemCardLvl(heroCardLvl: string): number {
        const min = parseInt(heroCardLvl) - this.cardGeneratorOptions.itemLvlGenRange;
        const max = parseInt(heroCardLvl);

        let generatedLvl = Math.floor(Math.random() * (max - min + 1)) + min;

        if (generatedLvl < 1) {
            generatedLvl = 1;
        }

        return generatedLvl;
    }

    generateItemCardType(heroCardClass) {
        const validFighterTypes = [this.types.bludgeoning, this.types.pericing];
        const validTankTypes = [this.types.sheild];
        const validAssassinTypes = [this.types.pericing, this.types.constriction, this.types.Poison];
        const validSorcererTypes = [this.types.lightning, this.types.fire, this.types.frost];
        const validWitchTypes = [this.types.Poison, this.types.lifeLink, this.types.radient];

        function randArrayItem(array) {
            if (array.length === 0) {
                console.error("In generateItemCardType() the array passed contains no length");
                return null;
            }
            const randIndex = Math.floor(Math.random() * array.length);
            return array[randIndex];
        }

        if (heroCardClass === this.classes.fighter) {
            return randArrayItem(validFighterTypes);

        } else if (heroCardClass === this.classes.trueTank) {
            return randArrayItem(validTankTypes);

        } else if (heroCardClass === this.classes.assassin) {
            return randArrayItem(validAssassinTypes);

        } else if (heroCardClass === this.classes.sorcerer) {
            return randArrayItem(validSorcererTypes);

        } else if (heroCardClass === this.classes.witch) {
            return randArrayItem(validWitchTypes);

        } else {
            console.error("In generateItemCardType() a valid class was not passed");
        }
        
    }

    findModPoints(itemLvl) {
        return itemLvl * this.cardGeneratorOptions.modPointsAwarderPerItemLvl;
    }

    generateItemCardMods(modPoints, cardType) {
        let points = modPoints;
        let statObject = {strength: 0, dexterity: 0, intelligence: 0, wisdom: 0};
        let statProbabilities = null;

        if (cardType === this.types.bludgeoning) {
            statProbabilities = {strength: 0.7, dexterity: 0.2, intelligence: 0.1, wisdom: 0};

        } else if (cardType === this.types.pericing) {
            statProbabilities = {strength: 0.8, dexterity: 0.1, intelligence: 0.1, wisdom: 0};

        } else if (cardType === this.types.constriction) {
            statProbabilities = {strength: 0.8, dexterity: 0.1, intelligence: 0.1, wisdom: 0};

        } else if (cardType === this.types.sheild) {
            statProbabilities = {strength: 0.3, dexterity: 0, intelligence: 0.6, wisdom: 0.1};

        } else if (cardType === this.types.lightning) {
            statProbabilities = {strength: 0.2, dexterity: 0.5, intelligence: 0, wisdom: 0.3};

        } else if (cardType === this.types.fire) {
            statProbabilities = {strength: 0.2, dexterity: 0.5, intelligence: 0, wisdom: 0.3};

        } else if (cardType === this.types.frost) {
            statProbabilities = {strength: 0.2, dexterity: 0.5, intelligence: 0, wisdom: 0.3};

        } else if (cardType === this.types.Poison) {
            statProbabilities = {strength: 0.2, dexterity: 0.4, intelligence: 0, wisdom: 0.3};

        } else if (cardType === this.types.lifeLink) {
            statProbabilities = {strength: 0.3, dexterity: 0.5, intelligence: 0, wisdom: 0.3};

        } else if (cardType === this.types.radient) {
            statProbabilities = {strength: 0.2, dexterity: 0.5, intelligence: 0, wisdom: 0.3};

        } else {
            console.error("in generateItemCardMods() a valid card type was not entered to find point probability");
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

    generatePoisonStats(cardType, strengthMod, wisdomMod, cardLvl) {
        const baseDamage = 35;
        const poison = {
            duration: null,
            damage: null
        }

        if (cardType !== this.types.Poison) {
            return poison;
        } // returns null values if type is not poison

        if (strengthMod === 0) {strengthMod = 1};
        if (wisdomMod === 0) {wisdomMod = 1};

        poison.duration = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        poison.damage = baseDamage + (strengthMod + wisdomMod * cardLvl * 2);

        return poison;
    }

    generateLifeLinkStat(cardType, cardLvl, wisdomMod) {
        const baseHeal = 40;
        
        if (cardType !== this.types.lifeLink) {
            return null;
        }

        if (wisdomMod === 0) {wisdomMod = 1};

        return baseHeal + (wisdomMod * cardLvl * 2);
    }

    generateRadientStat(cardType, cardLvl, dexMod) {
        const baseHeal = 0.05;
        const maxHeal = 0.8;
        let t = cardLvl + dexMod;

        if (cardType !== this.types.radient) {
            return null;
        }

        t = Math.max(0, Math.min(150, t));

        return (baseHeal + (t / 150) * (maxHeal - baseHeal)).toFixed(4);
    }


    //   ----------   item card build   ----------


    // builds the item cards to attach to hero card
    generateItemCards(heroCardClass, heroCardLvl) {
        const cardLvl = this.generateItemCardLvl(heroCardLvl);
        const cardType = this.generateItemCardType(heroCardClass);
        const mods = this.generateItemCardMods(this.findModPoints(cardLvl), cardType);
        const poison = this.generatePoisonStats(cardType, mods.strength, mods.wisdom, cardLvl);
        const lifeLink = this.generateLifeLinkStat(cardType, cardLvl, mods.wisdom);
        const radient = this.generateRadientStat(cardType, cardLvl, mods.dexterity);

        const newItemCard = {
            reqLvl: cardLvl,
            type: cardType,
            strengthMod: mods.strength,
            dexterityMod: mods.dexterity,
            intellegenceMod: mods.intelligence,
            wisdomMod: mods.wisdom,
            poisonDamage: poison.damage,
            poisonDuration: poison.duration,
            lifeLink: lifeLink,
            radient: radient,
        }

        return newItemCard;
    }


    //   ----------   final card build   ----------


    // builds the hero card array with item cards attatched
    generateCards() {
        //console.log('gen cards called');
        const newCardLvls = this.generateNewCardLevels();
        const newCardClasses = this.generateNewCardClasses();

        for (let i = 0; i < this.numCardsToCreate; i++){
            const avalibleStatPoints = this.findStatPoints(newCardLvls[i]);
            const statObject = this.generateNewCardStats(avalibleStatPoints, newCardClasses[i]);
            const itemCard = this.generateItemCards(newCardClasses[i], newCardLvls[i]);

            const newCard = {
                lvl: newCardLvls[i],
                class: newCardClasses[i],
                name: this.generateCardNames(newCardClasses[i]),
                vitality: this.generateVitality(newCardClasses[i], statObject.strength, itemCard.strengthMod, newCardLvls[i]),
                item: itemCard,
                actions: this.generateActions(),
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
