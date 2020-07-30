/************** REQUIRED MODULES **************/
var createError = require(`http-errors`);
var express = require(`express`);
var path = require(`path`);
var cookieParser = require(`cookie-parser`);
var logger = require(`morgan`);
var methodOverride = require(`method-override`);
var session = require(`express-session`);
var cors=require('cors');

/************** REOUTES FILES **************/
var indexRouter = require(`./routes/index`);
var usersRouter = require(`./routes/users`);
var productsRouter = require(`./routes/products`);
var apiRouter = require(`./routes/api/apiProductsRouter`);
var apiRouterUsers = require(`./routes/api/apiUsersRouter`);
var apiRouterContact = require (`./routes/api/apiContactRouter`);


/**************** APP EXPRESS ****************/
var app = express();

/************* VIEW ENGINE SETUP *************/
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);
app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));
app.use(methodOverride(`_method`));

// app.get('/products/por_cats', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// });
// app.get('/products//:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// });
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


/*********** APP LEVEL MIDDLEWARE ***********/
app.use(session({secret:"bunkerStoreRules",
resave: false,
    saveUninitialized: true
}));

app.use(function(req,res,next) {
res.locals.usuarioLogeado =req.session.usuarioLogeado;
next();
})

app.use(function(req,res,next) {
  res.locals.usuarioLogeado =req.session.usuarioLogeado;
  next();
  })
/****************** ROUTES ******************/
app.use(`/`, indexRouter);
app.use(`/users`, usersRouter);
app.use(`/products`, productsRouter);
app.use(`/contact`, indexRouter);
app.use(`/api/products`, apiRouter);
app.use(`/api/users`, apiRouterUsers);
app.use(`/api/contact`, apiRouterContact);

/*** CATCH 404 & FORWARD TO ERROR HANDLER ***/
app.use(function(req, res, next) {
  next(createError(404));
});

/*************** ERROR HANDLER ***************/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get(`env`) === `development` ? err : {};

/**************** ERROR RENDER ****************/
  res.status(err.status || 500);
  res.render(`error`);
});

/************** EXPORTING MODULE **************/
module.exports = app;
