const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
// if (process.env.ENVIRONMENT !== "production") {
//   const logger = require("morgan");
//   app.use(logger("dev"));
// }
app.use(bodyParser.json());
console.log(process.env.ENVIRONMENT);
require("./src/routes")(app);

// const uri = process.env.MONGO_URI || "mongodb://localhost/";
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
