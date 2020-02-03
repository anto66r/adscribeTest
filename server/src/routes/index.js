module.exports = app => {
  app.use("/api/users", require("../api/user/routes.js"));
  app.use("/", require("../api/root/routes.js"));
};
