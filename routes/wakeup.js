const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    //console.log('dice que me despierte');
    res.send('im waking up!');
});

module.exports = router;