const formatHistoricMatches = async (apiHistoric, database) => {
  let historicFormatted = [];
  let historic = apiHistoric.data.filter((match) => match.winner !== null);
  historic.map((match) => {
    let stage;
    let bestOf;
    if (match.name.includes(":")) {
      stage = match.name.substring(0, match.name.lastIndexOf(":"));
    } else {
      stage = match.tournament.name;
    }
    
    if (match.number_of_games === 1) {
      bestOf = "Best of 1";
    } else if (match.number_of_games === 2) {
      bestOf = "Best of 2";
    } else if (match.number_of_games === 3) {
      bestOf = "Best of 3";
    } else if (match.number_of_games === 5) {
      bestOf = "Best of 5";
    }
    let colorsLeague = Object.values(database[2]).find(
      (element) => element.id === match.league.id
    );
    let colorsTeamA =
      match.opponents[0] !== undefined &&
      Object.values(database[1]).find(
        (element) => element.id === match.opponents[0].opponent.id
      );
    let colorsTeamB =
      match.opponents[1] !== undefined &&
      Object.values(database[1]).find(
        (element) => element.id === match.opponents[1].opponent.id
      );

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
        id: match.league.id,
        colors: {
          LightVibrant: colorsLeague.LightVibrant,
          Vibrant: colorsLeague.Vibrant,
          DarkVibrant: colorsLeague.DarkVibrant,
        },
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
            colors: {
              DarkVibrant:
                colorsTeamA !== undefined && colorsTeamA.colors !== undefined
                  ? colorsTeamA.colors.DarkVibrant
                  : "#455a64",
            },
          },
        },
        {
          opponent: {
            id: match.opponents[1].opponent.id,
            name: match.opponents[1].opponent.name,
            image_url: match.opponents[1].opponent.image_url,
            colors: {
              DarkVibrant:
                colorsTeamB !== undefined && colorsTeamB.colors !== undefined
                  ? colorsTeamB.colors.DarkVibrant
                  : "#455a64",
            },
          },
        },
      ],
      results: match.results,
    });
  });
  return historicFormatted;
};

module.exports = formatHistoricMatches;
