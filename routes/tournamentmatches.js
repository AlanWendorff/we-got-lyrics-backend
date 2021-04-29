const express = require("express");
const router = express.Router();
const axios = require("axios");
const formatHistoricMatches = require("../scripts/FormatHistoricMatches");
const formatUpcomingMatches = require("../scripts/FormatUpcomingMatches");
const registerAllTeams = require("../scripts/FirebaseRegisterAllTeams");
const Laderboard = require("../scripts/Laderboard");
const updateLogo = require("../scripts/UpdateLogo");

const callAPI = async (id) => {
  try {
    let apiUpcoming = await axios.get(
      `https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&filter[status]=not_started,running&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`
    );
    let apiHistoric = await axios.get(
      `https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&filter[status]=finished&per_page=100&token=qMQof-eyYgmIhsESK2r67QvtlSRrKnIiPdSHY6vFX3qn3wIIuj4`
    );
    let ladder = Laderboard(apiHistoric);
    let imageLeague =
      apiHistoric.data[0] !== undefined
        ? apiHistoric.data[0].league.image_url
        : apiUpcoming.data[0].league.image_url;

    return {
      historicMatches: formatHistoricMatches(apiHistoric),
      upcomingMatches: formatUpcomingMatches(apiUpcoming),
      ladder: ladder,
      imageLeague: imageLeague,
    };
  } catch (error) {
    console.log(error);
  }
};

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await callAPI(id);
  res.send(response);
  let concated = [...response.historicMatches, ...response.upcomingMatches];
  registerAllTeams(concated);
  updateLogo(concated);
});

module.exports = router;
