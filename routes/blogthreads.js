const express = require("express");
const router = express.Router();
const { HLTV } = require("hltv");

router.get("/", async (req, res) => {
  let threads = HLTV.getRecentThreads().then((res) => {
    return res;
  });
  threads.then((threads) => {
    res.send(threads);
  });
});

module.exports = router;
