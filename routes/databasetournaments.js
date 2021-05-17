const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const getColor = require("../scripts/ExtractColorOther");

router.get("/", async (req, res) => {
  const database = FirebaseConfig();
  let pathsDatabase = database
    .ref("tournament")
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });

  pathsDatabase.then(async (pathsDatabase) => {
    let T = Object.values(pathsDatabase);

    let tournaments = await Promise.all(
      T.map(async (tournament) => {
        let colors = await getColor(tournament.image_url)
        return {
          id: tournament.id,
          image_url: tournament.image_url,
          name: tournament.name,
          colors: {
            DarkVibrant: colors.DarkVibrant,
          },
        };
      })
    );
    res.send(tournaments);
  });
});

module.exports = router;
