const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
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

  res.send({
    meta: data.meta,
    response: {
      song: { ...data.response.song },
    },
  });
});

module.exports = router;
