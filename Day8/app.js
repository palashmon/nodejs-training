var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

//--===============================================================
// Built-in middleware
//
// Express has the following built-in middleware functions:
// `express.static` serves static assets such as HTML files, images, and so on.
// `express.json` parses incoming requests with JSON payloads.
// `express.urlencoded` parses incoming requests with URL-encoded payloads.
//--===============================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//--===============================================================
// Third-party middleware
// load the cookie-parsing middleware
//--===============================================================
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//--===============================================================
// Application-level middleware
//--===============================================================
app.use(function (req, res, next) {
  console.log('\nTime:', new Date().toLocaleString());
  console.log('Request Type:', req.method);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
