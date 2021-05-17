const ColorThief = require("colorthief");
const tinycolor = require("tinycolor2");

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const getColor = (image) => {
  return new Promise((resolve, reject) => {
    ColorThief.getPalette(image, 5, 10)
    .then((palette) => {
      let hexcolors = palette.map((color) => {
        return rgbToHex(color[0], color[1], color[2]);
      });
      let analogcolors = palette.map((color) => {
        return {
          index: tinycolor(rgbToHex(color[0], color[1], color[2])).getBrightness(),
          hex: rgbToHex(color[0], color[1], color[2]),
        };
      }).sort(function(a, b) {
        return a.index - b.index;
      }).reverse();
      resolve(analogcolors);
    })
    .catch((err) => {
      reject(false);
    });
  })
};

module.exports = getColor;
