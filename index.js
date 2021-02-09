// setup the package variables
require('dotenv').config();
const express        = require('express');
const cors           = require('cors');

// initialize the app
const app = express();

//Habilitar express.json para leer datos 
app.use(express.json({ extended: true }));

app.use(cors());
/* app.use(function (req, res, next) {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}) */

// Importar rutas
app.use('/api/nextmatches', require('./routes/nextmatches'));
app.use('/api/prevmatches', require('./routes/prevmatches'));
app.use('/api/tournamentmatches', require('./routes/tournamentmatches'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});