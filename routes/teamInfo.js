const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormatMatches = require("../scripts/FormatMatches");
const formatRoster = require("../scripts/FormatRoster");
const setNewTournament = require("../scripts/FirebaseSetNewTournament");
const FirebaseConfig = require("../config/FirebaseConfig");

const callAPI = async (id, database) => {
  try {
    let apiHistoric = await axios.get(
      `https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=${id}&filter[finished]=true&token=${process.env.APIKEY_Y}`
    );
    let apiUpcoming = await axios.get(
      `https://api.pandascore.co/csgo/matches?sort=begin_at&filter[finished]=false&filter[unscheduled]=false&filter[opponent_id]=${id}&token=${process.env.APIKEY_Q}`
    );
    let apiRoster = await axios.get(
      `https://api.pandascore.co/csgo/players?filter[team_id]=${id}&token=${process.env.APIKEY_Y}`
    );

    let imageTeam;
    let winStrike = 0;
    let winRate = 0;
    let wl = [];
    let matchWin = 0;
    let lastMatch = apiHistoric.data[0] ? apiHistoric.data[0] : undefined;

    if (lastMatch) {
      if (lastMatch.opponents[0].opponent.id === parseInt(id)) {
        imageTeam = lastMatch.opponents[0].opponent.image_url;
      } else {
        imageTeam = lastMatch.opponents[1].opponent.image_url;
      }
      for (let i = 0; i < apiHistoric.data.length; i++) {
        if (apiHistoric.data[i].winner_id === parseInt(id)) {
          matchWin = matchWin + 1;
          if (wl.length < 5) {
            wl.push("W");
          }
        } else {
          if (wl.length < 5) {
            wl.push("L");
          }
        }
      }
      let avg = (matchWin * 100) / apiHistoric.data.length;
      winRate = parseFloat(avg).toFixed(2) + "%";

      for (let c = apiHistoric.data.length - 1; c >= 0; c--) {
        if (apiHistoric.data[c].winner_id === parseInt(id)) {
          winStrike = winStrike + 1;
        } else {
          winStrike = 0;
        }
      }
    }
    let colorsTeam = Object.values(database[1]).find(
      (element) => element.id === parseInt(id)
    ).colors ?? {
      DarkMuted: "#1c313a",
      DarkVibrant: "#455a64",
      LightMuted: "#455a64",
      LightVibrant: "#718792",
      Muted: "#1c313a",
      Vibrant: "#718792",
    };
    console.log(colorsTeam);
    const filterByWinner = true;
    return {
      historicMatches: FormatMatches(apiHistoric, database, filterByWinner),
      upcomingMatches: FormatMatches(apiUpcoming, database),
      roster: formatRoster(apiRoster),
      winStrike: winStrike,
      winRate: winRate,
      wl: wl,
      imageTeam: imageTeam,
      colors: colorsTeam,
    };
  } catch (error) {
    console.log(error);
  }
};

router.get("/:id", async (req, res) => {
  const database = FirebaseConfig();
  let DATABASE = database
    .ref()
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });
  let id = req.params.id;

  DATABASE.then(async (DATABASE) => {
    let database = Object.values(DATABASE);
    let response = await callAPI(id, database);
    res.send(response);
    setNewTournament(response.historicMatches);
  });
});

module.exports = router;
