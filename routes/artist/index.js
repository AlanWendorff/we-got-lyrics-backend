const setupArtistEndpoints = (app) => {
  app.use("/artists", require("./artist"));
  app.use("/artists", require("./songs"));
  app.use("/description", require("./description"));
  app.use("/albums", require("./albums"));
};

module.exports = setupArtistEndpoints;
