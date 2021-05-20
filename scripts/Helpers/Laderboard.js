const Laderboard = (apiHistoric) => {
  let AllTeams = apiHistoric.data.map((match) => {
    let { winner } = match;
    if (winner !== null) {
      return {
        name: winner.name,
        img: winner.image_url !== null ? winner.image_url : null,
      };
    }
  });

  function groupBy(list, keyGetter) {
    let map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  let AllTeamsScores = AllTeams.map((team) => {
    let grouped = groupBy(AllTeams, (team) => team.name);
    let gettedTeam = grouped.get(team.name);
    return {
      name: gettedTeam[0].name,
      img: gettedTeam[0].img,
      points: gettedTeam.length,
    };
  });
  let TeamScoresOrder = AllTeamsScores.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  ).sort(function (a, b) {
    return b.points - a.points;
  });
  return TeamScoresOrder;
};

module.exports = Laderboard;
