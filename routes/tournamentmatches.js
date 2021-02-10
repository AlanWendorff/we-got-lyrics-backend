const express = require('express');
const router = express.Router();
const axios  = require('axios');

const callAPI = async (id) => {
    try {
        const respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/matches?filter[league_id]=${id}&sort=begin_at&filter[status]=not_started,running&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`)
        const {data} = respuestaAPI;
        return data;
    } catch (error) {
        console.log(error);
    }
}

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await callAPI(id);
    res.send(response);
});

module.exports = router;