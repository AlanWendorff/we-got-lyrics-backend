const express = require("express");
const router = express.Router();
const getColor = require("../scripts/ExtractColorOther");

router.get("/", async (req, res) => {
  res.send(await getColor('https://cdn.pandascore.co/images/league/image/4449/CSGO_ProHouse.png'));
});

module.exports = router;
