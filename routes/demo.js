const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const database = FirebaseConfig();
router.get("/", async (req, res) => {
  let pathsDatabase = database
    .ref()
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });
  pathsDatabase.then((pathsDatabase) => {
    res.send(Object.values(pathsDatabase));
  });
});

module.exports = router;
