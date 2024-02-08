const setupSongEndpoints = (app) => {
  app.use("/songs", require("./song"));
  app.use("/lyrics", require("./lyrics"));
};

module.exports = setupSongEndpoints;
