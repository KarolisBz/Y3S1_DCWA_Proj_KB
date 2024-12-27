// class fields
var pmysql = require("promise-mysql");
var pool;

// create the connection
pmysql
  .createPool({
    connectionLimit: 3,
    host: "localhost",
    user: "root",
    password: "root",
    database: "proj2024mysql",
  })
  .then((p) => {
    pool = p;
  })
  .catch((e) => {
    console.log("pool error:" + e);
  });

var getStudents = function () {
  return new Promise((reslove, reject) => {
    pool.query("SELECT * FROM student ORDER BY sid ASC")
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error)
      })
  })
};

var getStudent = function (student_Id) {
  return new Promise((reslove, reject) => {
    pool.query("SELECT * FROM student WHERE sid = '" + student_Id + "';")
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

var updateStudent = function (student) {
  return new Promise((reslove, reject) => {
    pool.query("UPDATE student SET name = '" + student.name + "', age = " + student.age + " WHERE sid = '" + student.sid + "';")
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error)
      })
  })
};

var addStudent = function (student) {
  return new Promise((reslove, reject) => {
    pool.query("INSERT INTO student (sid, name, age) VALUES ('" + student.sid + "', '" + student.name + "', " + student.age + ");")
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error)
      })
  })
};

var getAggrigatedGrades = function () {
  return new Promise((reslove, reject) => {
    let largeQuery = `
    SELECT s.name AS 'name', m.name AS 'module', g.grade AS 'grade' 
    FROM student s 
    LEFT JOIN grade g ON s.sid = g.sid 
    LEFT JOIN module m ON g.mid = m.mid 
    ORDER BY s.name, g.grade ASC;`

    pool.query(largeQuery)
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error)
      })
  })
};

var getModuleInfo = function () {
  return new Promise((reslove, reject) => {
    pool.query("SELECT * FROM module;")
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error)
      })
  })
};

module.exports = { getStudents, addStudent, updateStudent, getStudent, getAggrigatedGrades, getModuleInfo }