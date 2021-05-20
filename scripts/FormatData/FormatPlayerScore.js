const FormatPlayerScore = (apiScore) => {
  let timelineFormatted = apiScore.data.teams.map((team) => {
    return {
      name: team.name,
      players: team.players.map((player) => {
        return {
          first_name: player.first_name,
          last_name: player.last_name,
          name: player.name,
          stats: {
            counts: {
                assists: player.stats.counts.assists,
                deaths: player.stats.counts.deaths,
                kills: player.stats.counts.kills,
                headshots: player.stats.counts.headshots,
            },
            per_game_averages: {
                adr: player.stats.per_game_averages.adr,
                hltv_game_rating: player.stats.per_game_averages.hltv_game_rating,
            }
          }
        };
      }),
    };
  });
  return timelineFormatted;
};

module.exports = FormatPlayerScore;
