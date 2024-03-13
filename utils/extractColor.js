const Vibrant = require("node-vibrant");

const extractColor = (image) =>
  new Promise((resolve, reject) => {
    Vibrant.from(image).getPalette((err, palette) => {
      let colors = err
        ? {
            DarkMuted: "#1c313a",
            DarkVibrant: "#455a64",
            LightMuted: "#455a64",
            LightVibrant: "#718792",
            Muted: "#1c313a",
            Vibrant: "#718792",
          }
        : {
            Vibrant: palette.Vibrant.getHex(),
            DarkVibrant: palette.DarkVibrant.getHex(),
            LightVibrant: palette.LightVibrant.getHex(),
            Muted: palette.Muted.getHex(),
            DarkMuted: palette.DarkMuted.getHex(),
            LightMuted: palette.LightMuted.getHex(),
          };

      resolve(colors);
    });
  });

module.exports = extractColor;
