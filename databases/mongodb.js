const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    db = client.db("proj2024MongoDB");
    coll = db.collection("lecturers");
  })
  .catch((error) => {
    console.log(error.message);
  });

// fetches all results in db coll
var getLecturers = function () {
  return new Promise((resolve, reject) => {
    var cursor = coll.find().sort({ _id: 1 });
    cursor
      .toArray()
      .then((documents) => {
        resolve(documents);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

var deleteLecturer = function (target_id) {
  return new Promise((resolve, reject) => {
    coll.deleteOne({ _id: target_id })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { getLecturers, deleteLecturer };