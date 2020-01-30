var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const CognitoExpress = require('cognito-express');
const bodyParser = require('body-parser')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded());

// app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Initializing CognitoExpress constructor
// N arn:aws:cognito-idp:eu-west-1:810307145250:userpool/eu-west-1_FbvelNMmP
const cognitoExpress = new CognitoExpress({
  region: 'eu-west-1',
  cognitoUserPoolId: 'eu-west-1_FbvelNMmP',
  tokenUse: 'access', //Possible Values: access | id
  tokenExpiration: 3600000, //Up to default expiration of 1 hour (3600000 ms)

});


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


// Auth routes:
const authenticatedRoute = express.Router();
app.use('/api', authenticatedRoute);


//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
authenticatedRoute.use((req, res, next) => {

  //I'm passing in the access token in header under key accessToken
  debugger;
  let accessTokenFromClient = req.headers.accesstoken;

  //Fail if token not present in header.
  if (!accessTokenFromClient) return res.status(401).send({
      result: false,
      message: `Access Token missing from header!`
    });

  cognitoExpress.validate(accessTokenFromClient, (err, response) => {

    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send({
      result: false,
      mesage: err
    });

    //Else API has been authenticated. Proceed.
    res.locals.user = response;
    next();
  });
});

//Define your routes that need authentication check
authenticatedRoute.get("/hello", function(req, res, next) {
  debugger;

    res.send({
      result: true,
      message: `Hi ${res.locals.user.username}, your API call is authenticated!`
    });

});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
