const express = require('express');
const router = express.Router();
const { HLTV } = require('hltv');

router.get('/', async (req, res) => {
    let teamRanking = await HLTV.getTeamRanking();
    res.send(teamRanking);
});

module.exports = router;