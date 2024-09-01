CREATE TABLE GameHistory (
    id SERIAL PRIMARY KEY,
    GameStartTime TIMESTAMP NOT NULL,
    GameEndTime TIMESTAMP NOT NULL,
    PlayerAId int NOT NULL,
    PlayerBId int NOT NULL,
    PlayerAElo int NOT NULL,
    PlayerBElo int NOT NULL,
    GameWinner boolean NOT NULL, -- True is playerA false is playerB
    FOREIGN KEY (PlayerAId) REFERENCES Users(id),
    FOREIGN KEY (PlayerBId) REFERENCES Users(id)
);
