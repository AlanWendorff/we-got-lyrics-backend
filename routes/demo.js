const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/:name", async (req, res) => {
  let name = req.params.name;
  /* let team = HLTV.getTeamByName({ name: name }).then((res) => {
    return res;
  }); */
  /* let response = HLTV.getRecentThreads().then((res) => {
    return res;
  }) */
  let response = HLTV.getEvents().then((res) => {
    return res;
  });
  response.then((response) => {
    res.send(response);
  });
});

module.exports = router;
