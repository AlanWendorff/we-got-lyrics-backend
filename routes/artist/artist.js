const { API_CONFIG, HEADERS_DEFAULT } = require("../../constants/constants");
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

  res.send(data);
});

module.exports = router;
