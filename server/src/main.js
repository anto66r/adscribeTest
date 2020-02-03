const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CognitoExpress = require("cognito-express");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "jade");

app.use("/", require("./api")(app));

// Initialize Mongoose
const uri = process.env.MONGO_URI;
console.log(uri);
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
