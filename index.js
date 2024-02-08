// setup the package variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const setupArtistEndpoints = require("./routes/artist");
const setupSongEndpoints = require("./routes/song");

// initialize the app
const app = express();

//Habilitar express.json para leer datos
app.use(express.json({ extended: true }));

app.use(cors());

// Importar rutas
app.use("/search", require("./routes/search"));
setupSongEndpoints(app);
setupArtistEndpoints(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
