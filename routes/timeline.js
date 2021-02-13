const express = require('express');
const router = express.Router();
const axios  = require('axios');

const callAPI = async () => {
    try {
        let respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/tournaments/upcoming?token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`)
        let {data} = respuestaAPI;
        return data;
    } catch (error) {
        console.log(error);
    }
}

router.get('/', async (req, res) => {
    let response = await callAPI();
    res.send(response);
});

module.exports = router;