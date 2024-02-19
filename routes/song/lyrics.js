const extractLyrics = require("../../utils/cheerio/extractLyrics");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let lyrics = await extractLyrics(req.query.song_url).then(
    (response) => response
  );

  res.send({
    lyrics,
  });
});

module.exports = router;
