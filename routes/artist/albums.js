// Not possible, to much time.

const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
const express = require("express");
const router = express.Router();

router.get("/:id/albums", async (req, res) => {
  let artist_id = req.params.id;

  let headers = {
    ...HEADERS_DEFAULT,
    Authorization: req.headers.authorization,
  };

  let page = 1;
  let allSongs = [];

  while (page !== null) {
    let response = await fetch(
      `${API_CONFIG.API_URL}/artists/${artist_id}/songs?per_page=50&sort=popularity&page=${page}`,
      {
        method: "get",
        headers,
      }
    ).then((response) => response.json());

    allSongs.push(response.response.songs);

    console.log("looping", response.response.next_page);

    page = response.response.next_page;
  }

  res.send(allSongs);
});

module.exports = router;
