CREATE TABLE Transaction (
    tid SERIAL PRIMARY KEY, 
    ammount NUMERIC(12,2), 
    transactionTime TIMESTAMP,
    toAccount integer REFERENCES Bank_Account(bid), 
    fromAccount integer REFERENCES Bank_Account(bid), 
    processed boolean
);
