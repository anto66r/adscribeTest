const router = require("express").Router();

router.route("/").get((req, res) => res.json({ message: "hello" }));

module.exports = router;
