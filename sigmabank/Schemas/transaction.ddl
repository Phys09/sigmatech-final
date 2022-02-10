CREATE TABLE Transactions (
    tid SERIAL PRIMARY KEY, 
    amount NUMERIC(12,2), 
    transactionTime TIMESTAMP,
    toAccount integer REFERENCES Bank_Account(bid), 
    fromAccount integer REFERENCES Bank_Account(bid), 
    processed boolean
);

