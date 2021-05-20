const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const database = FirebaseConfig();

router.get("/:team", (req, res) => {
  let TEAM = req.params.team;
  let teamsDatabase = database
    .ref("teams")
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    });
  teamsDatabase.then((teamsDatabase) => {
    let TEAMS = Object.values(teamsDatabase)
    let filteredTeams = []
    TEAMS.map((equipo) => {
      if (equipo.name.toLowerCase().startsWith(TEAM)) {
        filteredTeams.push({
          id: equipo.id,
          name: equipo.name,
          img: equipo.img
        });
      }
      return null;
    });
    res.send(filteredTeams);
  });
});

module.exports = router;
