const formatTimeline = (apiTimeline) => {
  let timelineFormatted = [];
  const timeline = apiTimeline.data.filter((date) => date.begin_at !== null);
  timeline.map((tournament) => {
    timelineFormatted.push({
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
      teams: tournament.teams,
      prizepool: tournament.prizepool,
    });
  });
  return timelineFormatted;
};

module.exports = formatTimeline;
