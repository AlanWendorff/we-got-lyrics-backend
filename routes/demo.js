const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/", async (req, res) => {
  //let nameee = req.params.name;
  /* let rosterMod = [];
  let team = HLTV.getTeamByName({ name: nameee }).then((res) => {
    return res;
  });
  let roster = team.then((response) => {
    response.players.map((player) => {
      let getedplayer = HLTV.getPlayer({ id: player.id }).then((res) => {
        return res;
      });
      getedplayer.then((getedplayer) =>{
        rosterMod.push(getedplayer);
      })
    });
    return rosterMod;
  }); */

  /* let response = HLTV.getRecentThreads().then((res) => {
    return res;
  }) */
  /* let events = HLTV.getEvents().then((res) => {
    return res;
  }); */
  let PlayerRanking = HLTV.getPlayerRanking().then((res) => {
    return res;
  });
  PlayerRanking.then((PlayerRanking) => {
    res.send(PlayerRanking.slice(0, 10));
  });
});

module.exports = router;
