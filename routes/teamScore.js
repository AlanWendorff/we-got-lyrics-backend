const express = require('express');
const router = express.Router();
const axios  = require('axios');
const FormatPlayerScore = require("../scripts/FormatData/FormatPlayerScore");

const callAPI = async (gameId) => {
    try {
        let respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/matches/${gameId}/players/stats?token=${process.env.APIKEY_Y}`)
        return {
            "teams": FormatPlayerScore(respuestaAPI)
        };
    } catch (error) {
        console.log(error);
    }
}

router.get('/:gameId', async (req, res) => {
    let gameId = req.params.gameId;
    let response = await callAPI(gameId);
    res.send(response);
});

module.exports = router;