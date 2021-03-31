const express = require('express');
const router = express.Router();
const axios  = require('axios');
const registerAllTeams  = require('../scripts/FirebaseRegisterAllTeams');
const Laderboard  = require('../scripts/Laderboard');
const updateLogo  = require('../scripts/UpdateLogo');

const callAPI = async (id) => {
    try {
        let respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&filter[status]=not_started,running&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`);
        let lastGames    = await axios.get(`https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&filter[status]=finished&per_page=100&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`)
        let ladder = Laderboard(lastGames.data);
        let imageLeague = lastGames.data[0].league.image_url;

        return {
            data: respuestaAPI.data,
            ladder: ladder,
            imageLeague: imageLeague,
        };
    } catch (error) {
        console.log(error);
    }
}

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let response = await callAPI(id);
    res.send(response);
    registerAllTeams(response.data);
    updateLogo(response.data);
});

module.exports = router;