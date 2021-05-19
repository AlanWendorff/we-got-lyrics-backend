const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");

router.get("/", async (req, res) => {
  const database = FirebaseConfig();
  let pathsDatabase = database
    .ref("tournament")
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });

  pathsDatabase.then((pathsDatabase) => {
    let T = Object.values(pathsDatabase);
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
