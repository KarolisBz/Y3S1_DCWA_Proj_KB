// App imports
var express = require('express')
var ejs = require("ejs")
var app = express()
// databases
var mySqldb = require("./databases/mySqldb.js")
var mongoDB = require("./databases/mongodb.js")
// setting render engine
app.set('view engine', 'ejs')
// allows access request body
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// Serving static CSS files from the static directory
app.use(express.static('static'));

// application starts and listens on port 3004
app.listen(3004, () => {
    console.log("Application listening on port 3004");
})

// roots //
// home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
})

app.get('/students', (req, res) => {
    mySqldb.getStudents()
        .then((data) => {
            res.render("students", { "students": data });
        })
        .catch((error) => {
            res.send(error)
        })
});

app.get('/grades', (req, res) => {
    res.render('grades');
});

app.get('/lecturers', (req, res) => {
    res.render('lecturers');
});