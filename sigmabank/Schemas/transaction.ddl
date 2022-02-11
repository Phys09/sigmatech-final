CREATE TABLE Transactions (
    tid SERIAL PRIMARY KEY, 
    amount NUMERIC(12,2), 
    transactionTime TIMESTAMP,
    toAccount integer REFERENCES Bank_Accounts(bid), 
    fromAccount integer REFERENCES Bank_Accounts(bid), 
    processed boolean
);

