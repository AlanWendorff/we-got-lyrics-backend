const formatHistoricMatches = (apiHistoric) => {
  let historicFormatted = [];

  apiHistoric.data.map((match) => {
    let stage;
    if (match.name.includes(":")) {
      stage = match.name.substring(
        match.name.lastIndexOf(0),
        match.name.lastIndexOf(":")
      );
    } else {
      stage = match.tournament.name;
    }
    let bestOf;
    if (match.number_of_games === 1) {
      bestOf = "Best of 1";
    } else if (match.number_of_games === 3) {
      bestOf = "Best of 3";
    } else if (match.number_of_games === 5) {
      bestOf = "Best of 5";
    }
    historicFormatted.push({
      status: match.status,
      official_stream_url: match.official_stream_url,
      winner: {
        name: match.winner.name,
        image_url: match.winner.image_url,
        id: match.winner.id,
      },
      stage: stage,
      bestOf: bestOf,
      league: {
        image_url: match.league.image_url,
        name: match.league.name,
      },
      serie: {
        full_name: match.serie.full_name,
      },
      begin_at: match.begin_at,
      id: match.id,
      opponents: [
        {
          opponent: {
            id: match.opponents[0].opponent.id,
            name: match.opponents[0].opponent.name,
            image_url: match.opponents[0].opponent.image_url,
          },
        },
        {
          opponent: {
            id: match.opponents[1].opponent.id,
            name: match.opponents[1].opponent.name,
            image_url: match.opponents[1].opponent.image_url,
          },
        },
      ],
      results: match.results,
    });
  });
  return historicFormatted;
};

module.exports = formatHistoricMatches;
