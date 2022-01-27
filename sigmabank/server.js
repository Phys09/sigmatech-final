const pg = require("pg");
const express = require("express");
const app = express();

const client = new pg.Client({
    user: "postgres",
    port: 5432,
    host: "localhost",
    database: "postgres",
    password: "password"
});

client.connect();

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send({"data": "hello"});
})

app.get('/express_backend', (req, res) => {
    res.send({express: "express connected to react"});
    //client.query("INSERT INTO fruit(name) VALUES ('orange');");
})

app.get('/createFruit', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    client.query("INSERT INTO fruit(name) VALUES ('kiwi');");
})


app.listen(5000);
console.log("server started on port 5000");