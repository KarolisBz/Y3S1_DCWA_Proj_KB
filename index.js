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
app.use(express.static('pages'));

// allows for easier validation
const { check, validationResult, checkExact } = require('express-validator');

// application starts and listens on port 3004
app.listen(3004, () => {
    console.log("Application listening on port 3004");
})

// roots //
// home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
})


// students //
app.get('/students', (req, res) => {
    mySqldb.getStudents()
        .then((data) => {
            console.log(data)
            res.render("students", { "students": data });
        })
        .catch((error) => {
            res.send(error)
        })
});

// update student page
app.get('/student/update/:sid', (req, res) => {
    mySqldb.getStudent(req.params.sid)
        .then((data) => {
            console.log(data)
            res.render("updateStudent", { "errors": undefined, "student": data[0] });
        })
        .catch((error) => {
            res.send(error)
        })
});

// handles updating student
app.post("/updateStudent",
    [
        check("name").isLength({ min: 2 })
            .withMessage("Name should be a minimum of 2 characters"),

        check("age").isInt({ min: 18 })
            .withMessage("Age must be 18 or older")
    ],
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("updateStudent", { errors: errors.errors, student: req.body })
        } else {
            mySqldb.updateStudent(req.body)
                .then((data) => {
                    //console.log(data)
                    res.redirect("/students");
                })
                .catch((error) => {
                    console.log(error)
                    res.render("updateStudent", { errors: [{"msg": error.sqlMessage}], student: req.body });
                });
        }
    })

// add student page
app.get('/students/add', (req, res) => {
    res.render("addStudent", { "errors": undefined, student: {"sid":'', "name":'', "age":''} });
});

// handles adding student
app.post("/addStudent",
    [
        check("name").isLength({ min: 2 })
            .withMessage("Name should be a minimum of 2 characters"),

        check("age").isInt({ min: 18 })
            .withMessage("Age must be 18 or older"),

        check("sid").isLength({ min: 4 })
            .withMessage("SID should be a minimum of 4 characterss")
    ],
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("addStudent", { errors: errors.errors, student: req.body})
        } else {
            mySqldb.addStudent(req.body)
                .then((data) => {
                    //console.log(data)
                    res.redirect("/students");
                })
                .catch((error) => {
                    console.log([error])
                    res.render("addStudent", { errors: [{"msg": error.sqlMessage}], student: req.body });
                });
        }
    })

// grades //
app.get('/grades', (req, res) => {
    res.render('grades');
});

// lecturers //
app.get('/lecturers', (req, res) => {
    res.render('lecturers');
});