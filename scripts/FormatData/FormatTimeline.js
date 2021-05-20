const formatTimeline = (apiTimeline, database) => {
  const timeline = apiTimeline.data.filter((date) => date.begin_at !== null);

  let timelineFormatted = timeline.map((tournament) => {
    let colorsLeague = Object.values(database).find(
      (element) => element.id === tournament.league.id
    );
    return {
      begin_at: tournament.begin_at,
      league_id: tournament.league_id,
      league: {
        name: tournament.league.name,
        image_url: tournament.league.image_url,
      },
      serie: {
        full_name: tournament.serie.full_name,
        tier: tournament.serie.tier,
      },
      name: tournament.name,
      teams: tournament.teams.map((team) => {return({id: team.id, image_url: team.image_url, name: team.name})}),
      prizepool: tournament.prizepool,
      colors: {
        DarkVibrant: colorsLeague ? colorsLeague.colors.DarkVibrant : "#455a64",
      },
    };
  });
  return timelineFormatted;
};

module.exports = formatTimeline;
