const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/:name", (req, res) => {
  let playerName = req.params.name;
  HLTV.getPlayerByName({ name: playerName }).then((response) => {
    res.send({
      name: response.name,
      ign: response.ign,
      image: response.image,
      age: response.age,
      twitter: response.twitter,
      instagram: response.instagram,
      twitch: response.twitch,
      country: {
        name: response.country.name,
        code: response.country.code,
      },
      statistics: {
        rating: response.statistics.rating,
        headshots: response.statistics.headshots,
        mapsPlayed: response.statistics.mapsPlayed,
      },
    });
  });
});

module.exports = router;
