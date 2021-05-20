const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormatMatches = require("../scripts/FormatData/FormatMatches");
const setNewTournament = require("../scripts/FirebaseFunctions/FirebaseSetNewTournament");
const registerAllTeams = require("../scripts/FirebaseFunctions/FirebaseRegisterAllTeams");
const updateLogo = require("../scripts/FirebaseFunctions/UpdateLogo");
const FirebaseConfig = require("../config/FirebaseConfig");
const database = FirebaseConfig();
const callAPI = async (database) => {
  try {
    let apiUpcoming = await axios.get(
      `https://api.pandascore.co/csgo/matches?sort=begin_at&filter[status]=not_started,running&token=${process.env.APIKEY_Q}`
    );
    return FormatMatches(apiUpcoming, database);
  } catch (error) {
    console.log(error);
  }
};

router.get("/", (req, res) => {
  let DATABASE = database
    .ref()
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    });
  DATABASE.then(async (DATABASE) => {
    let database = Object.values(DATABASE);
    let response = await callAPI(database);
    res.send(response);
    setNewTournament(response);
    registerAllTeams(response);
    updateLogo(response);
  });
});

module.exports = router;
