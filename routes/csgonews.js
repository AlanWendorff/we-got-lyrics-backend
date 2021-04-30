const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  let apicsgonews = await axios.get(
    "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=3&maxlength=300&format=json"
  );
  res.send(apicsgonews.data);
});

module.exports = router;
