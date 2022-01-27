const pg = require("pg");

const client = new pg.Client({
    user: "postgres",
    port: 5432,
    host: "localhost",
    database: "sigmabank",
    password: "sigbank412"
});

client.connect();

client.query("INSERT INTO users (uid) VALUES (27);")


