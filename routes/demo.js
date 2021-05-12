const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");

router.get("/", async (req, res) => {
  const database = FirebaseConfig();
  let firebaseDatabase = database
    .ref()
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      let response_teams = Object.values(responseOfDatabase);
      return response_teams;
    });
  firebaseDatabase.then((response_teams) => {
    res.send(response_teams[1]);
  });
});

module.exports = router;
