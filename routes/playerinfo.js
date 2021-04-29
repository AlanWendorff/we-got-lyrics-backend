const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/:name", async (req, res) => {
  let nameee = req.params.name;
  let response = HLTV.getPlayerByName({ name: nameee }).then((res) => {
    return res;
  });
  response.then((response) => {
    res.send(response);
  });
});

module.exports = router;
