var express = require("express");
var path = require("path");
var logger = require('morgan');

var indexRouter = require("./routes");

var app = express();
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
