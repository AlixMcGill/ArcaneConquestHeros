CREATE TABLE HeroInventory (
    id SERIAL PRIMARY KEY,
    PlayerId int NOT NULL,
    Lvl INT NOT NULL,
    CurrentExp INT NOT NULL,
    NextLvlExp INT NOT NULL,
    Name VARCHAR(30) NOT NULL,
    Class VARCHAR(30) NOT NULL,
    StrengthStat INT NOT NULL,
    IntellegenceStat INT NOT NULL,
    DexterityStat INT NOT NULL,
    WisdomStat INT NOT NULL,
    ItemHeldId INT NOT NULL,
    Actions INT NOT NULL,
    FOREIGN KEY (PlayerId) REFERENCES Users(id),
    FOREIGN KEY (ItemHeldId) REFERENCES Items(id)
);
