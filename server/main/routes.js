var express = require("express");
var router = express.Router();

/*
    POSTS ROUTES SECTION
*/

router.get("/api", (req, res, next) => {
  res.send("hello world");
});

module.exports = router;
