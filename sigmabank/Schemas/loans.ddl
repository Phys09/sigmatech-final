CREATE TABLE loans(
    lid int GENERATED ALWAYS AS IDENTITY, 
    loaned_to int REFERENCES Accounts(aid) NOT NULL,
    amount_loaned NUMERIC(12, 2) NOT NULL,
    interest_rate NUMERIC(12, 2) NOT NULL
);

CREATE TABLE morgatges(
    mid int GENERATED ALWAYS AS IDENTITY, 
    owner int REFERENCES Accounts(aid) NOT NULL,
    morgatge_amount NUMERIC(12, 2) NOT NULL,
    interest_rate NUMERIC(12, 2) NOT NULL
);

