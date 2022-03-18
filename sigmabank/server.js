const pg = require("pg");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cron = require('node-cron');

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

function makeAutomaticPayments() {
    client.query(`SELECT * FROM Automatic_Payments WHERE nextPaymentDate = CURRENT_DATE;`, (err, result) => {
        if (err) throw err;
        if (result.rowCount == 0) {
            console.log("No automatic payments for today");
        } else {
            for (let i = 0; i < result.rowCount; i++) {
                client.query(`SELECT now()::timestamp;`, (err, timestamp) => {
                    if (err) throw err;
                    client.query(`UPDATE Bank_Accounts SET balance = Bank_Accounts.balance + '${result.rows[i].amount}' WHERE bid='${result.rows[i].toaccount}';`, (err) => {
                        if (err) throw err;
                        client.query(`UPDATE Bank_Accounts SET balance = Bank_Accounts.balance - '${result.rows[i].amount}' WHERE bid='${result.rows[i].fromaccount}';`, (err) => {
                            if (err) throw err;    
                            client.query(`INSERT INTO Transactions VALUES (DEFAULT, '${result.rows[i].amount}', '${timestamp.rows[0].now.toDateString()}':: TIMESTAMP, '${result.rows[i].toaccount}', '${result.rows[i].fromaccount}', 'true');`, (err) => {
                                if (err) throw err;
                            });                    
                        });
                    });
                });

                const latestPaymentDate = result.rows[i].nextpaymentdate.toDateString();
                if (result.rows[i].recurring) {
                    client.query(`UPDATE Automatic_Payments 
                                SET lastPaymentDate='${latestPaymentDate}', 
                                nextPaymentDate='${latestPaymentDate}':: DATE + 30 
                                WHERE aid='${result.rows[i].aid}';`, (err) => {
                        if (err) throw err;
                    });
                } else {
                    client.query(`UPDATE Automatic_Payments 
                                SET lastPaymentDate='${latestPaymentDate}', 
                                nextPaymentDate=NULL 
                                WHERE aid='${result.rows[i].aid}';`, (err) => {
                        if (err) throw err;
                    });
                }
            }
            console.log("Completed automatic payments for today");
        }
    });
}

// Endpoints
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
        client.query(`SELECT * FROM Accounts WHERE type != '-1' AND email = '${email}' AND password_hash = MD5('${passwd}');`, (err, result) => {
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
    
    var aid = req.body.aid;
    var newUsername = req.body.newUsername;
    var newEmail = req.body.newEmail;
    var newPasswd = req.body.newPasswd;
    var newPhonenum = req.body.newPhonenum;
    var oldPasswd = req.body.oldPasswd;

    if (oldPasswd) {
        client.query(`SELECT * FROM Accounts WHERE aid='${aid}' AND password_hash=MD5('${oldPasswd}');`, (err, result) => {
            if (err) throw err;
            if (result.rowCount == 1) {
                if (newUsername) {
                    client.query(`UPDATE Accounts SET username='${newUsername}' WHERE aid='${aid}';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (newEmail) {
                    client.query(`UPDATE Accounts SET email='${newEmail}' WHERE aid='${aid}';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (newPasswd) {
                    client.query(`UPDATE Accounts SET password_hash=MD5('${newPasswd}') WHERE aid='${aid}';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (newPhonenum) {
                    client.query(`UPDATE Accounts SET phone_number='${newPhonenum}' WHERE aid='${aid}';`, (err) => {
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

app.post('/shutdown_account', (req, res) => {
    console.log(req.body);
    
    var aid = req.body.aid;
    var oldPasswd = req.body.oldPasswd;

    if (aid && oldPasswd) {
        client.query(`SELECT * FROM Accounts WHERE aid='${aid}' 
                    AND (
                        password_hash=MD5('${oldPasswd}')
                        OR 'SIGMA_ADMIN_PASSWORD'='${oldPasswd}'
                    );`, (err, result) => {
            if (err) throw err;
            if (result.rowCount == 1) {
                client.query(`UPDATE Accounts SET type='-1' WHERE aid='${aid}';`, (err) => {
                    if (err) throw err;
                });
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
})

app.post('/reactivate_account', (req, res) => {
    console.log(req.body);
    
    var aid = req.body.aid;

    if (aid) {
        client.query(`SELECT * FROM Accounts WHERE aid='${aid}';`, (err, result) => {
            if (err) throw err;
            if (result.rowCount == 1) {
                client.query(`UPDATE Accounts SET type='0' WHERE aid='${aid}';`, (err) => {
                    if (err) throw err;
                });
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
})

app.post('/get_transactions', (req, res) => {
    console.log(req.body);
    
    var aid = req.body.aid;
    var passwd = req.body.passwd;

    if (aid && passwd) {
        client.query(`SELECT t.*
                    FROM Transactions t, Accounts a, Bank_Accounts b
                    WHERE (t.toAccount='${aid}' OR t.fromAccount='${aid}')
                    AND b.bid='${aid}'
                    AND b.owner=a.aid
                    AND (
                        a.password_hash = MD5('${passwd}')
                        OR 'SIGMA_ADMIN_PASSWORD'='${passwd}'
                    )
                    ORDER BY transactionTime DESC;`, (err, result) => {
                if (err) throw err;
                if (result.rowCount > 0) {
                    res.send(result.rows);
                } else {
                    res.sendStatus(404);
                }
            }
        );
    } else {
        res.sendStatus(400);
    }
});

app.post('/get_owner', (req, res) => {
    console.log(req.body);

    var bid = req.body.bid;

    if (bid) {
        client.query(`SELECT * FROM Bank_Accounts WHERE bid='${bid}';`, (err, bid_result) => {
            if (err) throw err;
            if (bid_result.rowCount == 1) {
                client.query(`SELECT * FROM Accounts WHERE aid='${bid_result.rows[0].owner}';`, (err, result) => {
                    if (err) throw err;
                    res.send(result.rows);
                });
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
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
    var ownerId = req.body.ownerId;

    if (!(senderId && receiverId && amount)) {
        res.sendStatus(400);
    }

    client.query(`SELECT * FROM Bank_Accounts WHERE owner='${ownerId}' AND bid='${senderId}';`, (err, result) => {
        if(err) throw err;
        if (result.rowCount != 1) {
            res.sendStatus(404);
        } else {
            // Add (amount) to receiver
            client.query(`UPDATE Bank_Accounts SET balance = Bank_Accounts.balance + '${amount}' WHERE bid='${receiverId}';`, (err, result) => {
                if(err) throw err;
                if (result.rowCount != 1) {
                    res.sendStatus(404);
                } else {
                    // Take (amount) from sender
                    client.query(`UPDATE Bank_Accounts SET balance = Bank_Accounts.balance - '${amount}' WHERE bid='${senderId}';`, (err, result) => {
                        if(err) throw err;
                        if (result.rowCount != 1) {
                            res.sendStatus(404);
                        } else {
                            // Record transaction
                            client.query(`INSERT INTO Transactions VALUES (DEFAULT, '${amount}', '${timestamp}','${receiverId}','${senderId}', 'true');`, (err, result) => {
                                if(err) throw err;
                                if (result.rowCount != 1) {
                                    return Promise.reject('error');
                                } else {
                                    res.sendStatus(200);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/setup_automatic_payment', (req, res) => {
    var senderId = req.body.senderId;
    var receiverId = req.body.receiverId;
    var amount = req.body.amount;
    var recurring = req.body.recurring;
    var paymentDate = req.body.paymentDate;

    if (senderId && receiverId && amount && recurring && paymentDate) {
        client.query(`INSERT INTO Automatic_Payments (fromAccount, toAccount, amount, recurring, nextPaymentDate) 
                    VALUES ('${senderId}', '${receiverId}', '${amount}', '${recurring}', '${paymentDate}');`, (err) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(400);
    }
});

app.post('/stop_automatic_payment', (req, res) => {
    var aid = req.body.aid;

    if (aid) {
        client.query(`SELECT * FROM Automatic_Payments WHERE aid='${aid}';`, (err, result) => {
            if (err) throw err;
            if (result.rowCount == 1) {
                client.query(`DELETE FROM Automatic_Payments WHERE aid='${aid}';`, (err) => {
                    if (err) throw err;
                });
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

// app init
app.listen(5000);
console.log("Server started on port 5000");

// Replace cronExpression with this... 
//  - When testing: '* * * * *'
//  - After testing: '0 0 0 * * *'
cron.schedule('0 0 0 * * *', () => {
    console.log('Running daily automatic payments');
    makeAutomaticPayments();
});
