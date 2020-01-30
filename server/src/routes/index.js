module.exports = app => {
  app.use("/api/users", require("../api/user/routes.js"));
};
