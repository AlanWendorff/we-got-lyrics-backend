const setupArtistEndpoints = (app) => {
  app.use("/artists", require("./artist"));
  app.use("/artists", require("./songs"));
};

module.exports = setupArtistEndpoints;
