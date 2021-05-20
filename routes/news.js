const express = require('express');
const router = express.Router();
const HLTV = require('hltv-api').default

router.get('/', async (req, res) => {
    res.send(await HLTV.getNews());
});

module.exports = router;