const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
const express = require("express");
const router = express.Router();

router.get("/:id/all-songs", async (req, res) => {
  let artist_id = req.params.id;
  let count = 1;
  let headers = {
    ...HEADERS_DEFAULT,
    Authorization: req.headers.authorization,
  };

  let songs = [];

  while (count === 15) {
    let data = await fetch(
      `${API_CONFIG.API_URL}/artists/${artist_id}/songs?per_page=50&sort=popularity&page=${count}`,
      {
        method: "get",
        headers,
      }
    ).then((response) => response.json());

    songs.push(...data.response.songs);

    if (data.response.next_page) {
    }
  }

  res.send(data);
});

module.exports = router;
