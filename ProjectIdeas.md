# Hero Card Game Project Ideas

## User Account 

- Have an elo rating
- Have Ai Elo rating
- Have an Account lvl
- Have In game currency wallet NO REAL MONEY
- have an inventory of items 
- have an inventory of heros
- have an inventory of decks

## Account lvl
    items rewarded to the player cannot exceed more than 10 hero lvls of the highest lvl hero in the players inventory

    - lvl 0
        - 1 starter hero of Fighter class
        - 1 item, BareKnuckle
        - 1 deck slot

    - lvl 1
        - 1 hero of true tank class
        - 1 item, Sheild

    - lvl 2
        - 1 Hero of Sorcerer
        - 1 item, Wand

    - lvl 3 
        - 1 Hero of Assassin
        - 1 item, constriction 
        - 1 item, talasman life link

    - lvl 4 
        - 1 Hero of Witch
        - 1 item, peircing
    
    - each subiquent lvl will recieve the following
        - 1 deckslot, Hero or Currency 
        - 0 to 3 item cards 

## Pages

- Homepage
- Login / Create Account page
- Profile page
    - Profile stats
        - Campaign Progress
        - games played
    - Profile Setting
    - Inventory
        - Item Cards
        - Hero Cards
        - Decks
- Store page
- Leaderboard / stat page
- Game page
    - Multiplayer
    - Ai Battle
    - Campaign

## Hero Card Properties

1. must contain an image

2. Each card has the ability for one Holdable and swapable item

3. Each card must have a stat page

    - Exp (Max Lvl 250)
    - Vitality (Health)
    - Strength ()
        - Damage Mod & Block
    - Intellegence ()
        - Damage Mod & Parry
    - Dexterity ()
        - Damage Mod & Dodge
    - Wisdom ()
        - Damage Mod & Healing

4. Should be different card classes (Class names are generic for time being)

    - Fighter
    - Assassin (Buff to Dexterity High Nerf to Vitality)
    - Witch
    - Sorcerer
    - True Tank (no damage but buffed Vitality)

5. Damage Negates
    
    - Block (Deals percentage damage back to attacking hero)
    - Parry (Causes Damage buff to next attack by this hero)
    - Dodge ()

6. Healing
    
    - Life Link heal (deals damage to enemy hero, damage dealt heals friendly hero, targeted hero has disadvantage on next turn)
    - voodoo heal (damages a friendly hero to heal another friendly hero, target hero has advantage on next turn)
    - radient heal (heals friendly hero)

## Item Card Properties

1. Each Item has a damage type 

2. Each Item has class requirements 

3. each item has lvl requirements

4. item stats are randomized and cannot be changed 

4. all item types
    - Handeld Weapon
        - Bludgeoning, Fighter
        - Pericing, Fighter & Assassin
    - Bareknuckle
        - bludgening, Fighter
        - Constriction, Assassin
    - Wands, Sorcerer 
        - Arcane Lightning
        - Arcane Frost
        - Arcane Fire
    - Flasks
        - Poison, Witch & Assassin
    - Sheilds, True Tank
        - Block
        - Parry
    - Talasmans, Witch
        - Life link
        - Radient
        - voodoo
## Game Mechanics

1. Damage Types

    The Damage type comes from items
        
    - bludegeoning (Used By Fighter Class) -- affected by Strength Stat

    - Piercing (Used By Assassin or Fighter Class) -- affected by Strength Stat

    - Constriction (Used By assassin) -- affected by Strength Stat

    - Arcane (Used By Sorcerer Class) -- affected by Intellegence
        - Lightning -- affected by Dexterity
        - Frost -- affected by Wisdom
        - Fire -- affected by Strength

    - Poison (Used By Sorcerer or Assassin)

    - Life Steal (Used By Witch) -- affected by Wisdom

2. Items

    - Each Hero can only hold a single item 
    - some items will have class restrictions
    - all items will be randomly generated granted to the player

3. Shop 

    - in game currency can be used to buy and sell player generated items
    - heros are account bound and cannot be traded

4. Gameplay loop

    on game start the player with the lowest elo begins the game if the elo of both the players is equivilant
    the game will start with a coin toss

    1. Adjust feild (Player A)
    2. Select Actions/Targets (Player A Targets "Damage", Player B Actions "Healing")
    3. Roll Damage Negates (Player B)
    4. Roll Advantage & Disadvantage (Player A & B)
    5. Roll & deal Damage (PLayer A to Player B)
    6. Apply Healing (Player B)

    Swap players and repeat

- Items held by heros cannot be changed mid game
- Each player is allowed a maximum hand of 10 heros
- no more than 4 heros is allowed on the feild at any given moment 
- only one true tank is allowed on the feild at any given moment
- the player cannot see the hero stats of the opposing player apart from
    - Hero Vitality
    - Hero Lvl
    - Hero Actions (most heros can only preform one action but some will be peritted up to 3)
    - Hero Damage Type
    - Hero Class
- A True Tank Must Be attacked First before another hero can be targeted
- All Heros who enter the playing felid and then revoked will receive percentage Fleeing Damage i.e. loose 10% Vitality
- Win Condition
    - all player heros Vitality stats are pooled into a global health stat, once global health reaches zero the game is lost


players can play against an ai for Ai elo or real players for elo

## Public Leaderboard
    all players will be ranked on the leader board and orginised as such
    -- Elo Rank -- Player Name -- Wins -- Losses -- Number Of Games
