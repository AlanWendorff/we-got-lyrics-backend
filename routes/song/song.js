const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
const extractColor = require("../../utils/extractColor");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  let song_id = req.params.id;

  let headers = {
    ...HEADERS_DEFAULT,
    Authorization: req.headers.authorization,
  };

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
