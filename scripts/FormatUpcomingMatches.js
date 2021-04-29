const formatUpcomingMatches = (apiUpcoming) => {
  let upcomingFormatted = [];
  let upcoming = apiUpcoming.data.filter(
    (status) => status.status !== "canceled"
  );
  upcoming.map((match) => {
    let stage;
    let bestOf;
    if (match.name.includes(":")) {
      stage = match.name.substring(
        match.name.lastIndexOf(0),
        match.name.lastIndexOf(":")
      );
    } else {
      stage = match.tournament.name;
    }

    if (match.number_of_games === 1) {
      bestOf = "Best of 1";
    } else if (match.number_of_games === 3) {
      bestOf = "Best of 3";
    } else if (match.number_of_games === 5) {
      bestOf = "Best of 5";
    }

    upcomingFormatted.push({
      status: match.status,
      stage: stage,
      bestOf: bestOf,
      league: {
        image_url: match.league.image_url,
        name: match.league.name,
        id: match.league.id,
      },
      serie: {
        full_name: match.serie.full_name,
      },
      tournament: {
        league_id: match.tournament.league_id,
      },
      begin_at: match.begin_at,
      id: match.id,
      opponents: [
        match.opponents[0] !== undefined &&{
          opponent: {
            id: match.opponents[0].opponent.id,
            name: match.opponents[0].opponent.name,
            image_url: match.opponents[0].opponent.image_url,
          },
        },
        match.opponents[1] !== undefined&&{
          opponent: {
            id: match.opponents[1].opponent.id,
            name: match.opponents[1].opponent.name,
            image_url: match.opponents[1].opponent.image_url,
          },
        }
      ],
      results: match.results,
    });
  });
  return upcomingFormatted;
};

module.exports = formatUpcomingMatches;
