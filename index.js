// App imports
var express = require('express')
var ejs = require("ejs")
var app = express()
// databases
var pmysql = require("promise-mysql");
var mongoDB = require("./databases/mongodb.js")
// pages
var home = require("./pages/home.html")
// setting render engine
app.set('view engine', 'ejs')
// allows access request body
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// application starts and listens on port 3005
app.listen(3004, () => {
    console.log("Application listening on port 3004");
})

// home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
})