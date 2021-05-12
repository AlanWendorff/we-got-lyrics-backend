const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");

router.get("/:team", async (req, res) => {
  let team = req.params.team;
  const database = FirebaseConfig();
  let teamsDatabase = database
    .ref("teams")
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });
  teamsDatabase.then((teamsDatabase) => {
    let filteredTeams = [];
    Object.values(teamsDatabase).map((equipo) => {
      if (equipo.name.toLowerCase().startsWith(team)) {
        filteredTeams.push(equipo);
      }
      return null;
    });
    res.send(filteredTeams);
  });
});

module.exports = router;
