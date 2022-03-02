const pg = require("pg");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json({"limit": "5MB"}));
app.use(bodyParser.urlencoded({ extended: true }));

// PSQL init
const client = new pg.Client({
    user: "postgres",
    port: 5432,
    host: "localhost",
    database: "postgres",
    password: "password"
});

client.connect();

// endpoints
app.get('/', (req, res) => {
    res.send("Welcome to SigmaBank API V0.1.0");
})

app.post('/create_account', (req, res) => {
    
    var email = req.body.email;
    var passwd = req.body.password;
    var username = req.body.username;
    var phonenum = req.body.phonenum;

    client.query(`INSERT INTO Accounts(username, type, email, password_hash, phone_number) values ('${username}', '0', '${email}', MD5('${passwd}'), '${phonenum}');`, (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });
})

app.get('/list_accounts', (req, res) => {
    client.query(`SELECT * FROM Accounts;`, (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
})

app.post('/login', (req, res) => {
    console.log(req.body);

    var email = req.body.email;
    var passwd = req.body.passwd;

    if (email && passwd) {
        client.query(`SELECT * FROM Accounts WHERE email = '${email}' AND password_hash = MD5('${passwd}');`, (err, result) => {
            if (err) throw err;
            if (result.rowCount == 1) {
                res.send(result.rows);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

app.post('/edit_account', (req, res) => {
    console.log(req.body);
    
    var currentEmail = req.body.currentEmail;
    var newUsername = req.body.newUsername;
    var newEmail = req.body.newEmail;
    var oldPasswd = req.body.oldPasswd;
    var newPasswd = req.body.newPasswd;
    var newPhonenum = req.body.newPhonenum;

    if (oldPasswd) {
        client.query(`SELECT * FROM Accounts WHERE email='${currentEmail}' AND password_hash=MD5('${oldPasswd}');`, (err, result) => {
            if (err) throw err;
            if (result.rowCount == 1) {
                if (newUsername) {
                    client.query(`UPDATE Accounts SET username='${newUsername}' WHERE email='${currentEmail}';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (newEmail) {
                    client.query(`UPDATE Accounts SET email='${newEmail}' WHERE email='${currentEmail}'';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (newPasswd) {
                    client.query(`UPDATE Accounts SET password_hash=MD5('${newPasswd}') WHERE email='${currentEmail}';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (newPhonenum) {
                    client.query(`UPDATE Accounts SET phone_number='${newPhonenum}' WHERE email='${currentEmail}';`, (err) => {
                        if (err) throw err;
                    });
                }
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
})

app.post('/delete_account', (req, res) => {
    console.log(req.body);
    
    var email = req.body.email;

    client.query(`DELETE FROM Accounts WHERE email='${email}';`, (err) => {
        if (err) throw err;
    });
    res.sendStatus(200);
})

app.post('/get_transactions', (req, res) => {
    var accountName = req.body.accountName;
    var passwd = req.body.passwd;
    console.log("accountName, passwd");
    console.log(accountName, passwd);

    client.query(`SELECT t.*
                  FROM Transactions t, Accounts a, Bank_Accounts b
                  WHERE (t.toAccount='${accountName}' OR t.fromAccount='${accountName}')
                      AND b.bid='${accountName}'
                      AND b.owner=a.aid
                      AND (
                          a.password_hash = MD5('${passwd}')
                          OR 'SIGMA_ADMIN_PASSWORD'='${passwd}'
                      )
                  ORDER BY transactionTime DESC;`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
        console.log(result.rows);
    });
});

app.post('/get_bank_account', (req, res) => {
    var ownerId = req.body.ownerId;
    client.query(`SELECT * FROM Bank_Accounts WHERE owner='${ownerId}';`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
    });
});

app.post('/get_user', (req, res) => {
    var username = req.body.accountName;
    client.query(`SELECT 1 FROM Accounts WHERE username='${username}';`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
    });
});

// Gets the current timestamp.
app.get('/get_timestamp', (req, res) => {
    client.query(`SELECT now()::timestamp;`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
    });
});

// Makes a transaction between two bank accounts. Assumes senderId and receiverId exist in Bank_Accounts.
app.post('/make_transaction', (req, res) => {
    var senderId = req.body.senderId;
    var receiverId = req.body.receiverId;
    var amount = req.body.amount;
    var timestamp = req.body.timestamp;

    if (!(senderId && receiverId && amount)) {
        res.sendStatus(400);
    }

    // Take (amount) from sender
    client.query(`UPDATE Bank_Accounts SET balance = Bank_Accounts.balance - '${amount}' WHERE bid='${senderId}';`, (err, result) => {
        if(err) throw err;
        if (result.rowCount != 1) {
            res.sendStatus(404);
        }
    });

    // Add (amount) to receiver
    client.query(`UPDATE Bank_Accounts SET balance = Bank_Accounts.balance + '${amount}' WHERE bid='${receiverId}';`, (err, result) => {
        if(err) throw err;
        if (result.rowCount != 1) {
            res.sendStatus(404);
        }
    });

    // Record transaction
    client.query(`INSERT INTO Transactions VALUES (DEFAULT, '${amount}', '${timestamp}','${receiverId}','${senderId}', 'true');`, (err, result) => {
        if(err) throw err;
        if (result.rowCount != 1) {
            res.sendStatus(400);
        }
    });

    res.sendStatus(200);
});

// app init
app.listen(5000);
console.log("server started on port 5000");