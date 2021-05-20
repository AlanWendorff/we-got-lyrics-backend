const express = require("express");
const router = express.Router();
const axios = require("axios");
const formatTimeline = require("../scripts/FormatData/FormatTimeline");
const FirebaseConfig = require("../config/FirebaseConfig");
const database = FirebaseConfig();
const callAPI = async (database) => {
  try {
    let apiTimeline = await axios.get(
      `https://api.pandascore.co/csgo/tournaments/upcoming?page[size]=100&token=${process.env.APIKEY_Y}`
    );
    return formatTimeline(apiTimeline, database);
  } catch (error) {
    console.log(error);
  }
};

router.get("/", (req, res) => {
  let DATABASE = database
    .ref("tournament")
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    });
  DATABASE.then(async (DATABASE) => {
    let database = Object.values(DATABASE);
    let response = await callAPI(database);
    res.send(response);
  });
});

module.exports = router;
