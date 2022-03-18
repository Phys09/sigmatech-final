CREATE TABLE Transactions (
    tid SERIAL PRIMARY KEY, 
    amount NUMERIC(12,2), 
    transactionTime TIMESTAMP,
    toAccount integer REFERENCES Bank_Accounts(bid), 
    fromAccount integer REFERENCES Bank_Accounts(bid), 
    password_hash VARCHAR, 
    processed boolean
);

CREATE TABLE Automatic_Payments (
    aid int GENERATED ALWAYS AS IDENTITY,
    fromAccount integer REFERENCES Bank_Accounts(bid) NOT NULL,
    toAccount integer REFERENCES Bank_Accounts(bid) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    recurring boolean NOT NULL,
    lastPaymentDate DATE DEFAULT NULL,
    nextPaymentDate DATE
);
