const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/:name", async (req, res) => {
  let nameee = req.params.name;
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
  roster.then((roster) => {
    res.send(roster);
  });
});

module.exports = router;
