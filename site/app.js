/************** REQUIRED MODULES **************/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/************ REQUIRED CONTROLLER ************/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

/**************** APP EXPRESS ****************/
var app = express();

/************* VIEW ENGINE SETUP *************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****************** ROUTES ******************/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

/*** CATCH 404 & FORWARD TO ERROR HANDLER ***/
app.use(function(req, res, next) {
  next(createError(404));
});

/*************** ERROR HANDLER ***************/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

/**************** ERROR RENDER ****************/
  res.status(err.status || 500);
  res.render('error');
});

/************** EXPORTING MODULE **************/
module.exports = app;
