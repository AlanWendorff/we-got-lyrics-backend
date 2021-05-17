const express = require("express");
const router = express.Router();
const ColorThief = require("colorthief");

router.get("/", (req, res) => {
  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
  let image =
    "https://lokeshdhakar.com/projects/color-thief/image-3.919e184e.jpg";
  let colors = ColorThief.getPalette(image, 5, 10)
    .then((palette) => {
      let hexcolors = [];
      palette.map((color) => {
        let hex = rgbToHex(color[0], color[1], color[2]);
        console.log(hex);
        hexcolors.push(hex)
      });
      return hexcolors;
    })
    .catch((err) => {
      console.log(err);
    });

  colors.then((colors) => {
    res.send(colors);
  });
});

module.exports = router;
