const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");

router.get("/", async (req, res) => {
  const database = FirebaseConfig();
  let pathsDatabase = database
    .ref("teams")
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
