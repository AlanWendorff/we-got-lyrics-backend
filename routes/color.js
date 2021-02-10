const express = require('express');
const router = express.Router();
const ColorThief = require('colorthief');
let arrayColors;

router.post('/', (req, res) => {
    let image = req.body.image;
    ColorThief.getPalette(image, 5)
    .then(palette => { arrayColors = palette;})
    .catch(err => { console.log(err); })
    res.send(arrayColors);
    return arrayColors;
});

router.get('/', (req, res) => {
    res.send(arrayColors);
}); 

module.exports = router;