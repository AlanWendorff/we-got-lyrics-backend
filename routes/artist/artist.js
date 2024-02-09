const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
const extractArtistDescription = require("../../utils/extractArtistDescription");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  let artist_id = req.params.id;

  let headers = {
    ...HEADERS_DEFAULT,
    Authorization: req.headers.authorization,
  };

  let data = await fetch(`${API_CONFIG.API_URL}/artists/${artist_id}`, {
    method: "get",
    headers,
  }).then((response) => {
    return response.json();
  });

  let description = await extractArtistDescription(
    data.response.artist.url
  ).then((response) => response);

  res.send({
    meta: data.meta,
    response: {
      artist: { ...data.response.artist, formatted_description: description },
    },
  });
});

module.exports = router;
