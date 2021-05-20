const express = require("express");
const router = express.Router();
const FirebaseConfig = require("../config/FirebaseConfig");
const getColor = require("../scripts/Helpers/ExtractColorOther");

router.get("/", async (req, res) => {
  const database = FirebaseConfig();
  let pathsDatabase = database
    .ref("tournament")
    .once("value")
    .then(function (snapshot) {
      let responseOfDatabase = snapshot.val();
      return responseOfDatabase;
    });
  pathsDatabase.then(async (pathsDatabase) => {

     Object.values(pathsDatabase).map(async (tournament) => {
      let query = database.ref().child("tournament").orderByChild("id").equalTo(tournament.id);
      query.once("child_added", async function (snapshot) {
        snapshot.ref.update({
          colors: tournament.image_url !== "https://i.ibb.co/85J2B3C/csgo-Logo-Default-Black.png" && await getColor(tournament.image_url),
        });
      });
    })
  });
});

module.exports = router;
