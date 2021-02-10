const express = require('express');
const router = express.Router();
const path = require('path');
const getColors = require('get-image-colors');
const download = require('image-downloader');
const fs = require('fs');

let arrayColors;
let options;

router.post('/', async (req, res) => {
    let image = req.body.image;
    let name = req.body.name; 
    /* console.log(
        image.substring(
            str.lastIndexOf("/") + 1, 
            str.lastIndexOf(".png"))
    );  */

    if (fs.existsSync(__dirname + '/images' + '/' + name + '.png')) {
        console.log('ya existe este archivo');

        getColors(path.join(__dirname + '/images' + '/' + name + '.png')).then(colors => {
            arrayColors = colors;
            console.log(arrayColors);
            return arrayColors;
        })
    }else{
        console.log('no existe, lo descargo');
        options = {
            url: image,
            dest: __dirname + "/images"               // will be saved to /path/to/dest/image.jpg
        }
          
        download.image(options).then(({ filename }) => {
            console.log(filename);
            getColors(path.join(filename)).then(colors => {
                arrayColors = colors;
                console.log(arrayColors);
                return arrayColors;
            }) 
        }).catch((err) => console.error(err)) 
    }

    
    
});

router.get('/', async (req, res) => {
    res.send(colors);
});

module.exports = router;