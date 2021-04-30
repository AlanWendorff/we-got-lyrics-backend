const express = require("express");
const router = express.Router();
const SteamAPI = require("steamapi");
const steam = new SteamAPI("steam token");

router.get("/", async (req, res) => {
  /* steam.resolve("https://steamcommunity.com/profiles/76561198335782603")
    .then((id) => {
      return id;
    })
    .then((id) => {
        let summary = steam.getUserSummary(id)
        .then((summary) => {
            return summary;
        })
        console.log(summary);
    }) */
  steam.getUserStats("76561198335782603","730").then((ress) => {
    res.send(ress);
  });
});

module.exports = router;
