const extractCharts = require("../utils/extractCharts");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let charts = await extractCharts("https://genius.com/").then(
    (response) => response
  );

  res.send({
    charts,
  });
});

module.exports = router;
