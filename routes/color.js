const express = require("express");
const router = express.Router();
const extractColor = require("../utils/extractColor");

router.get("/", async (req, res) => {
  res.send(
    await extractColor(
      "https://cdn.pandascore.co/images/league/image/4449/CSGO_ProHouse.png"
    )
  );
});

module.exports = router;
