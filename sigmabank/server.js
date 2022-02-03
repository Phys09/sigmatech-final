const pg = require("pg");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

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
    res.send("Welcome to SigmaBank API");
})

app.get('/list_fruit', (req, res) => {
    client.query("SELECT * FROM fruit;", (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
})

app.post('/create_fruit/:name', (req, res) => {
    client.query(`INSERT INTO fruit(name) VALUES ('${req.params.name}');`, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
})

// app init
app.listen(5000);
console.log("server started on port 5000");