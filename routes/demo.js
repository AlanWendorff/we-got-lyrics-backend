const express = require("express");
const router = express.Router();
const getColor = require("../scripts/ExtractColor");

router.get("/", async (req, res) => {
  let image =
    "https://lokeshdhakar.com/projects/color-thief/image-3.919e184e.jpg";
  console.log(await getColor(image));
});

module.exports = router;
