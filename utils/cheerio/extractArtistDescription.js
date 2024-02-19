const axios = require("axios");
const cheerio = require("cheerio-without-node-native");

/**
 * @param {string} url - Genius URL
 */
module.exports = async function (url) {
  try {
    let { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let description = $('div[class="rich_text_formatting"]').text().trim();
    return description;
  } catch (e) {
    throw e;
  }
};
