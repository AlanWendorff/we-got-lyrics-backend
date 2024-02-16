const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

/**
 * @param {string} url - Genius URL
 */
module.exports = async function (url) {
  try {
    let { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let scrap = $("div.kfrnFZ > a.ChartItemdesktop__Row-sc-3bmioe-0").map(
      (index, element) => {
        let img = $(element).find("noscript").text();
        return {
          id: index,
          url: $(element).attr("href"),
          img: img.substring(img.indexOf(`http`), img.lastIndexOf(`\" class`)),
          title: $(element)
            .find("div.ChartSongdesktop__Title-sc-18658hh-3")
            .text(),
          owner: $(element).find("h4").text(),
          pageviews: $(element).find("div.hliVmp > span.knRXtG").text(),
        };
      }
    );

    let formattedScrap = [
      scrap["0"],
      scrap["1"],
      scrap["2"],
      scrap["3"],
      scrap["4"],
      scrap["5"],
      scrap["6"],
      scrap["7"],
      scrap["8"],
      scrap["9"],
    ];

    /*   return {
       url: $(element).attr("href"),
       title: $(element).find("div.ChartSongdesktop__Title-sc-18658hh-3").text(),
        owner: $(element).find("h4").text(),
        pageviews:  $(element).find("div.hliVmp > span.TextLabel-sc-8kw9oj-0").text(),
     }; */

    return formattedScrap;
  } catch (e) {
    throw e;
  }
};
