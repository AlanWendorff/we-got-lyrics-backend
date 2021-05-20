// setup the package variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// initialize the app
const app = express();

//Habilitar express.json para leer datos
app.use(express.json({ extended: true }));

app.use(cors());

// Importar rutas
app.use("/api/timeline", require("./routes/timeline"));
app.use("/api/teaminfo", require("./routes/teamInfo"));
app.use("/api/tournamentmatches", require("./routes/tournamentmatches"));
app.use("/api/allmatches", require("./routes/allmatches"));
app.use("/api/teamscore", require("./routes/teamScore"));
app.use("/api/hltvranking", require("./routes/hltvranking"));
app.use("/api/news", require("./routes/news"));
app.use("/api/playerinfo", require("./routes/playerinfo"));
app.use("/database/tournaments", require("./routes/databasetournaments"));
app.use("/database/searchteam", require("./routes/searchteam"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
