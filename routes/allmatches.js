const express = require("express");
const router = express.Router();
const axios = require("axios");
const formatUpcomingMatches = require("../scripts/FormatUpcomingMatches");
const setNewTournament = require("../scripts/FirebaseSetNewTournament");
const registerAllTeams = require("../scripts/FirebaseRegisterAllTeams");
const updateLogo = require("../scripts/UpdateLogo");

const callAPI = async () => {
  try {
    let apiUpcoming = await axios.get(
      `https://api.pandascore.co/csgo/matches?sort=begin_at&filter[status]=not_started,running&token=${process.env.APIKEY_Q}`
    );
    return formatUpcomingMatches(apiUpcoming);
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  let response = await callAPI();
  res.send(response);
  setNewTournament(response);
  registerAllTeams(response);
  updateLogo(response);
});

module.exports = router;
