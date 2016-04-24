var express    = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.listen(2000);

app.post("/", function (req, res) {
    console.log(req.body) // populated!
    res.send(200, req.body);
});