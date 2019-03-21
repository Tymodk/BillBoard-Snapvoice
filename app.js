var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require("express-session");
var okta = require("@okta/okta-sdk-nodejs");
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
const bodyParser = require('body-parser');





const dashboardRouter = require("./routes/dashboard");         
const publicRouter = require("./routes/public");
const scraperRouter = require("./routes/scraper");
const usersRouter = require("./routes/users");

var app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/billboard';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var oktaClient = new okta.Client({
  orgUrl: 'https://dev-535937.okta.com',
  token: '00SL6tm9xCQuRXaFCTEjGwNcMqelFLJ-Y8VDSEH7fQ'
});
const oidc = new ExpressOIDC({
  issuer: "https://dev-535937.okta.com/oauth2/default",
  client_id: '0oacnr5h1akMiTkee356',
  client_secret: 'l5J8GO6g5oP3S1bghQPQgJZiMoqytWinJw2Nrrsl',
  redirect_uri: 'http://localhost:8080/users/callback',
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fqiodfhqpsdfhsdqpuhfqushfusdqfuchsnfuqysdofuqyt',
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);
app.use((req, res, next) => {
  if (!req.userinfo) {
    return next();
  }

  oktaClient.getUser(req.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
});
function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).render("unauthenticated");
  }

  next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', publicRouter);
app.use('/dashboard', loginRequired, dashboardRouter);
app.use('/scraper', scraperRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
