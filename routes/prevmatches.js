const express = require('express');
const router = express.Router();
const axios  = require('axios');
const updateLogo  = require('../scripts/UpdateLogo');

const callAPI = async (teamId) => {
    try {
        let respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=${teamId}&filter[finished]=true&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`)
        let {data} = respuestaAPI;
        let imageLeague = data[0].league.image_url;
        console.log(imageLeague);
        return {
            data: data,
            imageLeague: imageLeague,
        };
    } catch (error) {
        console.log(error);
    }
}

router.get('/:teamId', async (req, res) => {
    let teamId = req.params.teamId;
    let response = await callAPI(teamId);
    res.send(response);
    updateLogo(response.data);
});

module.exports = router;