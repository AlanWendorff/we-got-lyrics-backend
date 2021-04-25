const express = require('express');
const router = express.Router();
const { HLTV } = require('hltv');

router.get('/', async (req, res) => {
    const news = await HLTV.getTeamRanking();
    res.send(news);
});

module.exports = router;