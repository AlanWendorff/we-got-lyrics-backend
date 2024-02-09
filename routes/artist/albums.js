const extractArtistAlbums = require("../../utils/extractArtistAlbums");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let albums = await extractArtistAlbums(`${req.query.artist_url}/albums`).then(
    (response) => response
  );

  res.send({
    albums: "albums",
  });
});

module.exports = router;
