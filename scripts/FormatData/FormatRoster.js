const formatRoster = (apiRoster) => {
  let rosterFormatted = apiRoster.data.map((player) => {
    return({
      nationality: player.nationality,
      image_url: player.image_url,
      name: player.name,
      first_name: player.first_name,
      last_name: player.last_name,
    });
  });
  return rosterFormatted;
};

module.exports = formatRoster;
