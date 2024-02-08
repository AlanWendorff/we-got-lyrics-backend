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
app.use("/search", require("./routes/search"));

app.use("/songs", require("./routes/song/song"));
app.use("/lyrics", require("./routes/song/lyrics"));

app.use("/artists", require("./routes/artist/artist"));
app.use("/artists", require("./routes/artist/songs"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
