const express = require("express");
const router = express.Router();
const axios = require("axios");
const formatHistoricMatches = require("../scripts/FormatHistoricMatches");
const formatRoster = require("../scripts/FormatRoster");
const formatUpcomingMatches = require("../scripts/FormatUpcomingMatches");
const updateLogo = require("../scripts/UpdateLogo");
const registerTeam = require("../scripts/FirebaseRegisterTeam");
const setNewTournament = require("../scripts/FirebaseSetNewTournament");

const callAPI = async (id) => {
  try {
    let apiHistoric = await axios.get(
      `https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=${id}&filter[finished]=true&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`
    );
    let apiUpcoming = await axios.get(
      `https://api.pandascore.co/csgo/matches?sort=begin_at&filter[finished]=false&filter[unscheduled]=false&filter[opponent_id]=${id}&token=qMQof-eyYgmIhsESK2r67QvtlSRrKnIiPdSHY6vFX3qn3wIIuj4`
    );
    let apiRoster = await axios.get(
      `https://api.pandascore.co/csgo/players?filter[team_id]=${id}&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`
    );
    
    let imageTeam;
    let winStrike = 0;
    let winRate = 0;
    let wl = [];
    let matchWin = 0;
    let lastMatch = apiHistoric.data[0];

    if (lastMatch.opponents[0].opponent.id === parseInt(id)) {
      imageTeam = lastMatch.opponents[0].opponent.image_url;
    } else {
      imageTeam = lastMatch.opponents[1].opponent.image_url;
    }

    if (lastMatch) {
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

    return {
      historicMatches: formatHistoricMatches(apiHistoric),
      upcomingMatches: formatUpcomingMatches(apiUpcoming),
      roster: formatRoster(apiRoster),
      winStrike: winStrike,
      winRate: winRate,
      wl: wl,
      imageTeam: imageTeam,
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
  updateLogo(concated);
  registerTeam(concated, id);
  setNewTournament(response.upcomingMatches);
});

module.exports = router;
