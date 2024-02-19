const extractArtistDescription = require("../../utils/cheerio/extractArtistDescription");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let description = await extractArtistDescription(req.query.artist_url).then(
    (response) => response
  );

  res.send({
    description,
  });
});

module.exports = router;
