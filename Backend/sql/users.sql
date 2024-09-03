CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email varchar(50) NOT NULL,
    username varchar(30) NOT NULL,
    password varchar(70) NOT NULL,
    accountLvl int NOT NULL,
    currentExp int NOT NULL,
    ExpToNextLvl int NOT NULL,
    Elo int NOT NULL
);
