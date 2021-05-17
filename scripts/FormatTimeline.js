const getColor = require("../scripts/ExtractColorOther");

const formatTimeline = async (apiTimeline) => {
  const timeline = apiTimeline.data.filter((date) => date.begin_at !== null);
  let timelineFormatted = await Promise.all(
    timeline.map(async (tournament) => {
      let colors = await getColor(tournament.league.image_url);
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
        teams: tournament.teams,
        prizepool: tournament.prizepool,
        colors: {
          DarkVibrant: colors.DarkVibrant,
        },
      };
    })
  );
  return timelineFormatted;
};

module.exports = formatTimeline;
