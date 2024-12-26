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

var deleteStudent = function (student_Id) {
  return new Promise((reslove, reject) => {
    pool
      .query("DELETE FROM student WHERE student_id == " + student_Id + ";")
      .then((data) => {
        console.log("D=" + JSON.stringify(data));
        reslove(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { getStudents, deleteStudent }