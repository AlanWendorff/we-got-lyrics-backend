const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormatMatches = require("../scripts/FormatMatches");
const registerAllTeams = require("../scripts/FirebaseRegisterAllTeams");
const Laderboard = require("../scripts/Laderboard");
const updateLogo = require("../scripts/UpdateLogo");
const FirebaseConfig = require("../config/FirebaseConfig");

const callAPI = async (id, database) => {
  try {
    let apiUpcoming = await axios.get(
      `https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&filter[status]=not_started,running&token=${process.env.APIKEY_Y}`
    );
    let apiHistoric = await axios.get(
      `https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&filter[status]=finished&per_page=100&token=${process.env.APIKEY_Q}`
    );
    let ladder = Laderboard(apiHistoric);
    let imageLeague =
      apiHistoric.data[0] !== undefined
        ? apiHistoric.data[0].league.image_url
        : apiUpcoming.data[0].league.image_url;

    let colorsLeague = Object.values(database[2]).find(
      (element) => element.id === parseInt(id)
    );
    const filterByWinner = true;
    return {
      historicMatches: FormatMatches(apiHistoric, database, filterByWinner),
      upcomingMatches: FormatMatches(apiUpcoming, database),
      ladder: ladder,
      imageLeague: imageLeague,
      colors: colorsLeague.colors,
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
    let concated = [...response.historicMatches, ...response.upcomingMatches];
    registerAllTeams(concated);
    updateLogo(concated);
  });
});

module.exports = router;
