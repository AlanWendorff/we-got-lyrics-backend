// setup the package variables
require('dotenv').config();
const express        = require('express');
const axios          = require('axios');
const bodyParser     = require('body-parser');
const cors           = require('cors');

// initialize the app
const app = express();

// set the app's functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// call the API

// no extra url needed!
axios.get('https://api.pandascore.co/csgo/matches?&token=yVPKLDCsTsxGSJcEWb_gbzDiC6NSWVQ3thriZ3Qft_p6lGvLxPc')
.then(data => {
  // use CircularJSON because the response
  // has circular references in it
  console.log(data);
  //res.send(data);
})
// check for errors
.catch(error=> {
  console.log(error.message);
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});