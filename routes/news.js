const express = require('express');
const router = express.Router();
const HLTV = require('hltv-api').default

router.get('/', async (req, res) => {
    const news = await HLTV.getNews();
    res.send(news);
});

module.exports = router;