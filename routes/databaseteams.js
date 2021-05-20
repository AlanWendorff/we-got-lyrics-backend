const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const database = FirebaseConfig();
router.get("/", (req, res) => {
  let pathsDatabase = database
    .ref("teams")
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    });
  pathsDatabase.then((pathsDatabase) => {
    res.send(Object.values(pathsDatabase));
  });
});

module.exports = router;
