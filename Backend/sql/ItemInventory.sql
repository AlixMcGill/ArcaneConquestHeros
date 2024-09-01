CREATE TABLE ItemInventory (
    id SERIAL PRIMARY KEY,
    UserId int NOT NULL,
    ItemId int NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(id),
    FOREIGN KEY (ItemId) REFERENCES Items(id)
);
