const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const getColor = require("../scripts/ExtractColorOther");

router.get("/", (req, res) => {
  const database = FirebaseConfig();
  let firebaseDatabase = database
    .ref()
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      let responseDatabase = Object.values(responseOfDatabase);
      return responseDatabase;
    });

  let rank = firebaseDatabase.then(async (responseDatabase) => {
    let HLTVRANKING = responseDatabase[0];
    let TEAMS = Object.values(responseDatabase[1]);

    let ranking = await Promise.all(
      HLTVRANKING.map(async (team) => {
        let { TEXT_RANKING } = team;
        let [
          positionUnformatted,
          orgUnformatted,
          rosterUnformatted,
          balanceUnformatted,
        ] = TEXT_RANKING.split("\n \n");
        let positionFormatted = positionUnformatted.replace("#", "");
        let pointsFormatted = orgUnformatted
          .substring(
            orgUnformatted.lastIndexOf("("),
            orgUnformatted.lastIndexOf(")")
          )
          .replace("(", "")
          .replace(" points", "");
        let nameFormatted = orgUnformatted
          .replace("(", "")
          .replace(")", "")
          .replace(" points", "")
          .replace(" ", "")
          .replace(pointsFormatted, "");

        let rosterFormatted = rosterUnformatted.split("\n");
        let balanceFormatted = balanceUnformatted
          .split("\n\n")[1]
          .replace(" ", "");
        let teamInDatabase = TEAMS.find(
          (element) =>
            element.name.toLowerCase() === nameFormatted.toLowerCase()
        );
        let colors = await getColor(teamInDatabase.img);
        return {
          position: parseInt(positionFormatted),
          name: nameFormatted,
          img: teamInDatabase.img,
          id: teamInDatabase.id,
          points: parseInt(pointsFormatted),
          roster: rosterFormatted,
          balance: balanceFormatted,
          colors: {
            DarkVibrant: colors.DarkVibrant,
            Vibrant: colors.Vibrant,
          },
        };
      })
    );
    return ranking;
  });

  rank.then((rank) => {
    res.send(rank);
  });
});

module.exports = router;
