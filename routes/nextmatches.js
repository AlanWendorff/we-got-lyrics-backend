const express = require('express');
const router = express.Router();
const axios  = require('axios');
const registerTeam  = require('../scripts/FirebaseRegisterTeam');

const callAPI = async (teamId) => {
    try {
        let respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/matches?sort=begin_at&filter[finished]=false&filter[unscheduled]=false&filter[opponent_id]=${teamId}&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`)
        let {data} = respuestaAPI;
        if (data.length > 0) {
            registerTeam(data, teamId);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

router.get('/:teamId', async (req, res) => {
    let teamId = req.params.teamId;
    let response = await callAPI(teamId);
    res.send(response);
});

module.exports = router;