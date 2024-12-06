export default class generateCards {
    constructor(numCardsToCreate, cardLvlArray) {
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
            fighter: ["Iron Fist", "Destr0yer", "ShadowStr", "Blaze Fury", "ThndrClap", "MightyTtn", "Steel Vipr", "CrmsnWolf", "RagngBull", "Phantom", 
                "Nightmare", "ViperKng", "BlkPanthr", "Rampage", "Hurricane", "IronHmr", "Predator", "Wolfhrt", "SavBeast", "Thndrstrm", 
                "VenmFang", "GoldDrag", "DarkPhnx", "KingCobra", "SilvBullet", "Gladiatr", "VnmsVixen", "Tornado", "RedWidow", "BlzWarrior", 
                "Talon", "Bersrkr", "StoneFst", "Hellhound", "RogueKngt", "Sledghmr", "StormBrgr", "Fury", "SteelSrpt", "DrgnSlayr", 
                "VkingRage", "SilvWolf", "ScorpnKng", "Vortex", "Hellfire", "Titanus", "Warlord", "SteelTtn", "EagleEye", "Frostbte", 
                "ShdwFury", "IronBest", "CrmsnRepr", "Doomsday", "KingRng", "ThndrStrk", "Reaper", "Deadshot", "Blackout", "Inferno", 
                "Wolfbane", "Valkyrie", "Blodhnd", "Hammer", "NghtWolf", "Ravenous", "Stormrg", "SavFury", "Hellriser", "LonWolf", 
                "IronWolf", "ShdwPhntm", "CobraCmmdr", "Juggernaut", "RagngStrm", "Maverick", "Beast", "SavHawk", "Bonecrshr", "BlckKnigh", 
                "DrkKnigh", "SilvStorm", "Phoenix", "DrgnKing", "RedDrgn", "BlzKing", "Mammoth", "KngFury", "InfrnlFlm", "Hellstrm", 
                "Vndctr", "ThndrFury", "VenmStrk", "BttlHawk", "CrmsnStrm", "RagngRhno", "Dreadnht", "CeltWar", "BntyHntr", "Stormcld", 
                "WlfSlayr", "LghtnngStk", "TtnFury", "Guardi0n", "Ironclad", "WildBest", "SteelDrgn", "NghtDmon", "CrmsnFury", "VprStrk", 
                "ShdwTln", "GiantSlayr", "Reckonng", "WarSpirit", "VngfulHnt", "Butcher", "BlckWdow", "TtnSlayr", "SteelHmr", "Tyrant", 
                "DrgnClaw", "Dthbrngr", "BerskFury", "IronRepr", "Battlebrn", "ShdwClaw", "VkingWr", "NghtStlkr", "ThndrVpr", "GhstWrrior"],
            trueTank: ["IronJugg", "SteelTtn", "RgnCloss", "Behemoth", "WarMachn", "ThndrStrk", "FortStee", "Warlord", "Armgedon", "Goliath", 
                "HvyHtttr", "DoomBrngr", "Anvil", "Ironclad", "Bastion", "BttlFstrs", "TtnReavr", "Sntnl", "Oblivn", "TheWall", 
                "HrdndTtn", "Warhmmr", "Juggrnt", "SteelBst", "CrmsnTnk", "GrimSntnl", "Stnbrkr", "IronGrdn", "Rampart", "Battlecrsh", 
                "Thndrstrm", "Vngrd", "MltFury", "Overlord", "Destr0yr", "TtnTnss", "Erthshkr", "Dthbrngr", "FryofIronBst", "Reckonng", 
                "Citadl", "HvyReavr", "CllssofWr", "TtnSlayr", "GrimRepr", "Inferno", "BstofBttlfld", "Thndrclp", "KngTrnchs", "Barricde", 
                "Ravgr", "Hellfire", "Fstrs", "Wrlrd", "Shckwv", "IronVltre", "IronBst", "Doomsd", "OnyxGrdn", "Rampart", "GrzlyTnk", 
                "SteelBrcde", "Sldghmrr", "Unbrkble", "Vortex", "BlkHawk", "TtncMght", "IrnThndr", "Rgnrok", "Tempst", "WarShld", 
                "Leviathn", "StrmBrgr", "GntofStee", "Hllstrm", "CrmsnKngt", "IrnWrden", "VkingFrt", "IronWall", "Golem", "BstnPwr", 
                "SteelPldn", "Drdnght", "ObsdnBst", "IronWall", "RampgnIron", "Invincbl", "Bttlcrsr", "HvyAsslt", "TtnShld", "CbltRepr", 
                "TnkDstry", "VictoryHmr", "Ttnfl", "Warbrngr", "UnstpblFr", "CrmsnFry", "MltTtn", "FstofStee", "Crusher", "Thndrhmr", 
                "ShdwFstrs", "RefrcdStee", "Guardi0n", "BttlTtn", "ScorchdErth", "Blckout", "SiegMstr", "IrnThndrbllt", "GlithRbrn", 
                "StnTtn", "VictoryTnk", "TctclJggrn", "FryofStee", "IrnWrth", "Onslght", "InvnblFstrs", "Dvsttr", "RampGrdn", "SiegMchn", 
                "ThndrTtn", "CrmsnBrcde", "OblvnTnk", "IronBulw", "Stormbrgr", "WreckngBl", "ArmrdBst", "Extrmntr", "BlzofStee", "ImprlGrdn"],
            sorcerer: ["AzrShdw", "SlnaDrkwvr", "MalchFlm", "EzrNght", "ThalStrm", "KorthMys", "VesprMnsd", "DarDnklm", "EryndrEtrn", "LyraStwvr", 
                "ZoltrEnc", "VldrsDbrngr", "KldrFrost", "SrphnNgtblm", "MrdkUndng", "ItharaVdcllr", "EldrnShdwcst", "ArdnFlmwvr", "RvnDrkstrm", 
                "TlndrsDskwhsp", "ElwenBlodmg", "AzrkBlck", "CalusFrost", "NyxShdwbn", "ValthrWise", "AlthraDrmwvr", "MalothStrmvr", "RavnDkrsr", 
                "VionEmbrht", "KirothVdsk", "RavenaUnsn", "ThalrThndrht", "IlraFrostwvr", "JrethNgtblm", "AmrDrksp", "XrthSrspskr", "KynthVdwhspr", 
                "DrkrFlmbndr", "SrilthShdwsoul", "XlnaMnfr", "VrnthBdthrns", "AzrkStmnd", "KlnCrsd", "IllyraFlmhrt", "VrthShdwmncr", "ElyndrDwnbrng", 
                "CldorBlckstn", "AlronArc", "FennrNgtshd", "IstrthFlmwvr", "ZanraDrkflm", "VekithEtrn", "VrnaiFrstmntl", "NrthDmwhrspr", "SylsStrmrdr", 
                "RylnaShdwmst", "KornBlwdwr", "ThalnVdctsr", "TalyahNghtfr", "KldrDreadd", "LyrianEmbrvl", "IshraStnwkr", "AlrithShdwbn"],
            assassin:["ShdwStrkr", "ViperFng", "ThornStryk", "BlazeFng", "SlyViper", "Phantom", "DthWhspr", "NytFang", "RogueFng", "VnshDstrr", 
                "CrmsnFang", "ThndrClw", "RngSnkr", "StrkNgt", "TdnViper", "WrdStrike", "RgnWraith", "WispFury", "MoonFng", "CrmRgn", 
                "GrnViper", "VenmVrg", "FrostWrd", "RogueDstr", "BlckVlt", "ShdwFury", "DthHawk", "Dagger", "VenMstr", "ThndrsHawk", 
                "FangBiter", "VermStrkr", "SilvWhspr", "NghtrVenm", "DarkFng", "Shdwtldr", "VenStryk", "WispBlade", "RgnKiller", "Stealthr", 
                "BlckSnkr", "StrkVlt", "GrimClaw", "VenmThorn", "IronFng", "FrostBitr", "NightBld", "Dmslkr", "BlckRevr", "PhntmWrd", 
                "BlizStrkr", "Silent", "VnglViper", "VntBlaze", "ChsnShdw", "ColdFury", "RvrSlayr", "Creeper", "VplrVenm", "DarkProwl", 
                "Shadwrn", "MntWraith", "KnvRgn", "RngDstr", "ShdwVenm", "VenmKlr", "CrsdBld", "VprDstrr", "Shdwclaw", "Dmslstrk", 
                "BlzViper", "DthDger", "WhtSnkr", "BlkVenm", "FrostVen", "FngRage", "ShrdFury", "NghtTrk", "CbtAssn", "BldHwk", 
                "Crsngrnd", "VldkVenm", "CrwViper", "Stealth", "MtnVenm", "GrlmRangr", "RgnClaw", "GnViper", "PshrdClw", "Blaze"],
            witch: ["ShdwWitch", "Lilith", "ThornSstr", "Mystira", "Celenia", "Vldra", "FrostShdw", "DakrFury", "NoxFury", "Vespera", 
                "Ithara", "Athenra", "Zhara", "Elara", "Morwyn", "Taylora", "Elyssa", "Yvraen", "Shivara", "Zorra", 
                "Rylira", "Vailys", "Leandra", "Venstra", "Vlahira", "Zalyss", "Lunara", "Ravena", "Calyss", "Orithra", 
                "Vixora", "Kirael", "Velora", "Hekira", "Meralyn", "Valria", "Zhenra", "Odessa", "Shira", "Nevara", 
                "Jorina", "Nyvra", "Marana", "Kalyra", "Azraeth", "Jenthra", "Ithriya", "Tanyra", "Narira", "Helysa", 
                "Sorine", "Elorain", "Veldra", "Kranza", "Dysra", "Syara", "Lyrina", "Thalira", "Nerisa", "Sahra", 
                "Irsa", "Lucira", "Valithra", "Mithira", "Karael", "Ferenza", "Thalira", "Mystria", "Eolara", "Anorith", 
                "Eramira", "Evangra", "Ciryana", "Soliya", "Ysvelia", "Trelora", "Azelith", "Tyrina", "Yzra", "Verira", 
                "Galvra", "Ellyra", "Virana", "Ansera", "Miriss", "Thrasna", "Valena", "Shaera", "Azharra", "Lyralyn", 
                "Nythera", "Dyrina", "Aldra", "Vandira", "Mireth", "Irelth", "Falira", "Sylvra", "Izra", "Blana", 
                "Varelia", "Rynera", "Mystris", "Talina", "Laerath", "Elyra", "Falarin", "Grazia"] 
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


    generateItemCardLvl(heroCardLvl) {
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
