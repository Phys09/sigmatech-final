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

// app init
app.listen(5000);
console.log("server started on port 5000");