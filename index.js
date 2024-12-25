// App imports
var express = require('express')
var ejs = require("ejs")
var app = express()
// databases
var pmysql = require("promise-mysql");
// setting render engine
app.set('view engine', 'ejs')
// allows access request body
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


app.listen(3004, () => {
    console.log("Application listening on port 3004");
})

app.get("/", (req, res) => {
    res.send("Hello World");
})