const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
const extractColor = require("../../utils/cheerio/extractColor");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  let headers = {
    ...HEADERS_DEFAULT,
    Authorization: req.headers.authorization,
  };

  let song_id = req.params.id;
  let songData = req.query.song_data;

  if (song_id === "000") {
    let searchedSong = await fetch(
      `${API_CONFIG.API_URL}/search?q=${songData}`,
      {
        method: "get",
        headers,
      }
    ).then((response) => response.json());

    song_id = searchedSong.response.hits[0].result.id;
  }

  let data = await fetch(`${API_CONFIG.API_URL}/songs/${song_id}`, {
    method: "get",
    headers,
  }).then((response) => response.json());

  let header_image_colors = await extractColor(
    data.response.song.header_image_url
  ).then((response) => response);

  res.send({
    meta: data.meta,
    response: {
      song: { ...data.response.song, header_image_colors },
    },
  });
});

module.exports = router;
