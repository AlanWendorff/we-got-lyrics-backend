const express = require("express");
const router = express.Router();
const axios = require("axios");
const formatTimeline = require("../scripts/FormatTimeline");
const FirebaseConfig = require("../config/FirebaseConfig");
const setNewTournament = require("../scripts/FirebaseSetNewTournament");
///upcoming .filter(live => live.live_supported !== false);
//.sort(function(a,b){ return new Date(a.begin_at) - new Date(b.begin_at)}).filter(seriewin => seriewin.serie.winner_id === null).filter(win => win.winner_id === null);
const callAPI = async (database) => {
  try {
    let apiTimeline = await axios.get(
      `https://api.pandascore.co/csgo/tournaments/upcoming?page[size]=100&token=${process.env.APIKEY_Y}`
    );
    return formatTimeline(apiTimeline, database);
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  const database = FirebaseConfig();
  let DATABASE = database
    .ref('tournament')
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });
  DATABASE.then(async (DATABASE) => {
    let database = Object.values(DATABASE);
    let response = await callAPI(database);
    res.send(response);
  });
});

module.exports = router;
