const { API_CONFIG, HEADERS_DEFAULT } = require("../constants/constants");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let headers = {
    ...HEADERS_DEFAULT,
    Authorization: req.headers.authorization,
  };

  let data = await fetch(`${API_CONFIG.API_URL}/search?q=${req.query.q}`, {
    method: "get",
    headers,
  }).then((response) => {
    return response.json();
  });

  res.send(data);
});

module.exports = router;
