const express = require("express");
const router = express.Router();

const array = [
  {
    TEXT_RANKING:
      "#2\n \n Astralis(808 points)\n \n Xyp9x\n dupreeh\n gla1ve\n device\n Magisk\n \n \n\n -",
  },
  {
    TEXT_RANKING:
      "#3\n \n Heroic(730 points)\n \n cadiaN\n refrezh\n stavn\n TeSeS\n sjuush\n \n \n\n +9",
  },
  {
    TEXT_RANKING:
      "#4\n \n Natus Vincere(659 points)\n \n s1mple\n electronic\n Boombl4\n Perfecto\n B1T\n \n \n\n -3",
  },
  {
    TEXT_RANKING:
      "#5\n \n Virtus.pro(635 points)\n \n SANJI\n buster\n Qikert\n Jame\n YEKINDAR\n \n \n\n -1",
  },
  {
    TEXT_RANKING:
      "#6\n \n Liquid(563 points)\n \n FalleN\n NAF\n EliGE\n Stewie2K\n Grim\n \n \n\n -1",
  },
  {
    TEXT_RANKING:
      "#7\n \n FURIA(464 points)\n \n arT\n yuurih\n VINI\n junior\n KSCERATO\n \n \n\n +3",
  },
  {
    TEXT_RANKING:
      "#8\n \n Vitality(449 points)\n \n shox\n RpK\n apEX\n ZywOo\n misutaaa\n \n \n\n -2",
  },
  {
    TEXT_RANKING:
      "#9\n \n Spirit(413 points)\n \n chopper\n mir\n sdy\n degster\n magixx\n \n \n\n -2",
  },
  {
    TEXT_RANKING:
      "#10\n \n Complexity(400 points)\n \n jks\n RUSH\n k0nfig\n poizon\n blameF\n \n \n\n -1",
  },
  {
    TEXT_RANKING:
      "#11\n \n NIP(373 points)\n \n REZ\n hampus\n nawwk\n Plopski\n ztr\n \n \n\n +2",
  },
  {
    TEXT_RANKING:
      "#12\n \n BIG(370 points)\n \n tabseN\n tiziaN\n syrsoN\n XANTARES\n k1to\n \n \n\n -4",
  },
];

router.get("/", async (req, res) => {
  let ranking = [];

  array.map((team) => {
    let { TEXT_RANKING } = team;
    let [
      positionUnformatted,
      orgUnformatted,
      rosterUnformatted,
      balanceUnformatted,
    ] = TEXT_RANKING.split("\n \n");
    let positionFormatted = positionUnformatted.replace("#", "");
    let pointsFormatted = orgUnformatted
      .substring(
        orgUnformatted.lastIndexOf("("),
        orgUnformatted.lastIndexOf(")")
      )
      .replace("(", "")
      .replace(" points", "");
    let nameFormatted = orgUnformatted
      .replace("(", "")
      .replace(")", "")
      .replace(" points", "")
      .replace(" ", "")
      .replace(pointsFormatted, "");

    let rosterFormatted = rosterUnformatted.split("\n");
    let balanceFormatted = balanceUnformatted.split("\n\n")[1].replace(" ", "");
    ranking.push({
      position: parseInt(positionFormatted),
      name: nameFormatted,
      points: parseInt(pointsFormatted),
      roster: rosterFormatted,
      balance: balanceFormatted,
    });
  });

  res.send(ranking);
});

module.exports = router;
