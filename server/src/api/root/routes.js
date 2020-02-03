const router = require("express").Router();

router.route("/").get((req, res) => process.env.ENVIRONMENT);

module.exports = router;
