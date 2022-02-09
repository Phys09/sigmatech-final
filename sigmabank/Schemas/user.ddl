CREATE TABLE Account (
    aid int GENERATED ALWAYS AS IDENTITY, 
    username VARCHAR(20) NOT NULL, 
    email VARCHAR NOT NULL, type INT, 
    password_hash VARCHAR NOT NULL, 
    phone_number VARCHAR(15), 
    PRIMARY KEY(aid)
);

CREATE TABLE Bank_Account (
    bid SERIAL PRIMARY KEY, 
    type int NOT NULL, 
    balance NUMERIC(12, 2) NOT NULL, 
    owner int REFERENCES Account(aid) NOT NULL
);


