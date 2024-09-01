CREATE TABLE Items (
    id SERIAL PRIMARY KEY,
    Name varchar(20) NOT NULL,
    Description varchar(300) NOT NULL,
    requiredLvl int NOT NULL,
    StrengthMod int NOT NULL,
    IntellegenceMod int NOT NULL,
    DexterityMod int NOT NULL,
    WisdomMod int NOT NULL
);
