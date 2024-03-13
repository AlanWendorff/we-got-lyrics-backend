const setupArtistEndpoints = (app) => {
  app.use("/artists", require("./artist"));
  app.use("/artists", require("./songs"));
  app.use("/artists", require("./albums"));
  app.use("/description", require("./description"));
};

module.exports = setupArtistEndpoints;
