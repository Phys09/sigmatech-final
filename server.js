var express = require('express');
var app = new express();

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.send("index.html");
});

app.listen(5000);
console.log("ready on port 5000!");
