const express = require('express');
const router = express.Router();
const axios  = require('axios');
const CircularJSON   = require('circular-json');

const callAPI = async () => {
    try {
        const respuestaAPI = await axios.get('https://api.pandascore.co/csgo/matches?&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc')
        //console.log(respuestaAPI);
        return respuestaAPI;
    } catch (error) {
        console.log(error);
    }
}

router.get('/', async (req, res) => {
    const toSend = await callAPI();
    res.send(CircularJSON.stringify(toSend));
});

module.exports = router;