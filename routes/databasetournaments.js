const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const database = FirebaseConfig();

router.get("/", (req, res) => {
  let TOURNAMENTS_DATABASE = database
    .ref("tournament")
    .once("value")
    .then(function (snapshot) {
      return snapshot.val()
    });

    TOURNAMENTS_DATABASE.then((TOURNAMENTS_DATABASE) => {
    let T = Object.values(TOURNAMENTS_DATABASE);
    let tournaments = T.map((tournament) => ({
      id: tournament.id,
      image_url: tournament.image_url,
      name: tournament.name,
      colors: {
        DarkVibrant: tournament.colors.DarkVibrant,
      },
    }));
    res.send(tournaments);
  });
});

module.exports = router;
