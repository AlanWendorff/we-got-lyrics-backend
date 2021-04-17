const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");

router.get("/", (req, res) => {
  let ranking = [];
  const database = FirebaseConfig();
  let firebaseDatabase = database
    .ref("HLTV_RANKING")
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      let response_HLTV_RANKING = Object.values(responseOfDatabase);
      return response_HLTV_RANKING;
    });

  let rank = firebaseDatabase.then((response_HLTV_RANKING) => {
    response_HLTV_RANKING.map((team) => {
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
      ranking.push({
        position: parseInt(positionFormatted),
        name: nameFormatted,
        points: parseInt(pointsFormatted),
        roster: rosterFormatted,
        balance: balanceFormatted,
      });
    });
    return ranking;
  });

  rank.then((rank) => {
    res.send(rank);
  });
  
});

module.exports = router;
