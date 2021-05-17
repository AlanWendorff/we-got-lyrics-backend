const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/:name", async (req, res) => {
  let nameee = req.params.name;
  let response = HLTV.getPlayerByName({ name: nameee }).then((res) => {
    return res;
  });
  response.then((response) => {
    res.send(
      {
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
      }
    );
  });
});

module.exports = router;
