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
    console.log(req.body);
    
    var email = req.body.email;
    var passwd = req.body.passwd;
    var phonenum = req.body.phonenum;

    client.query(`INSERT INTO Accounts(email, password, phone_number) values ('${email}', '${passwd}', '${phonenum}');`, (err, result) => {
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
        client.query(`SELECT * FROM Accounts WHERE email='${email}' AND password='${passwd}';`, (err, result) => {
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

app.put('/edit_account', (req, res) => {
    console.log(req.body);
    
    var email = req.body.email;
    
    var old_passwd = req.body.old_passwd;
    var new_passwd = req.body.new_passwd;
    var new_phonenum = req.body.new_phonenum;

    if (old_passwd) {
        client.query(`SELECT email, password FROM Accounts WHERE email = '${email}' AND password = '${old_passwd}';`, (selectErr, result) => {
            if (selectErr) throw selectErr;
            if (result.rowCount == 1) {
                if (new_passwd) {
                    client.query(`UPDATE Accounts SET password = '${new_passwd}' WHERE email = '${email}';`, (err) => {
                        if (err) throw err;
                    });
                }
                if (new_phonenum) {
                    client.query(`UPDATE Accounts SET phone_number = '${new_phonenum}' WHERE email = '${email}';`, (err) => {
                        if (err) throw err;
                    });
                }
                res.send("Account details updated");
            } else {
                res.send("Incorrect current password");
            }
        });
    } else {
        res.send("Enter your current password");
    }
})

app.delete('/delete_account', (req, res) => {
    console.log(req.body);
    
    var email = req.body.email;

    client.query(`DELETE FROM Accounts WHERE email = '${email}';`, (req, res) => {
        if (err) throw err;
    });
    res.send("Account deleted");
})

app.get('/get_transactions', (req, res) => {
    var accountName = req.body.accountName;
    client.query(`SELECT * FROM Transactions WHERE toAccount=${accountName} OR fromAccount=${accountName} ORDER BY transactionTime ASC;`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
    });
});

app.get('/get_bank_account', (req, res) => {
    var ownerId = req.body.accountName;
    client.query(`SELECT * FROM Bank_Accounts WHERE owner=${ownerId};`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
    });
});

app.get('/get_user', (req, res) => {
    var username = req.body.accountName;
    client.query(`SELECT 1 FROM Accounts WHERE username=${username};`, (err, result) => {
        if(err) throw err;
        res.send(result.rows);
    });
});

// app init
app.listen(5000);
console.log("server started on port 5000");