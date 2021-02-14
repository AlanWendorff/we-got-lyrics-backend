const express = require('express');
const router = express.Router();
const axios  = require('axios');
///upcoming .filter(live => live.live_supported !== false);
//.sort(function(a,b){ return new Date(a.begin_at) - new Date(b.begin_at)}).filter(seriewin => seriewin.serie.winner_id === null).filter(win => win.winner_id === null);
const callAPI = async () => {
    try {
        let respuestaAPI = await axios.get(`https://api.pandascore.co/csgo/tournaments/upcoming?page[size]=100&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc`)
        let {data} = respuestaAPI;
        const dataFiltered = data.filter(date => date.begin_at !== null);
        return dataFiltered;
    } catch (error) {
        console.log(error);
    }
}

router.get('/', async (req, res) => {
    let response = await callAPI();
    res.send(response);
});

module.exports = router;