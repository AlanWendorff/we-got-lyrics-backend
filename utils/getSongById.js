const { API_CONFIG } = require("../constants/constants");
const extractLyrics = require("./extractLyrics");

/**
 * @param {(number|string)} id
 */
module.exports = async function (id, headers) {
  if (!id) throw "No id was provided";

  try {
    let {
      data: {
        response: { song },
      },
    } = await fetch(`${API_CONFIG.API_URL}/songs/${id}`, {
      method: "get",
      headers,
    });

    let lyrics = await extractLyrics(song.url);
    return {
      id: song.id,
      title: song.full_title,
      url: song.url,
      lyrics,
      albumArt: song.song_art_image_url,
    };
  } catch (e) {
    throw e;
  }
};
