var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
/**
 * For testing redis connected or not enable below code
 * inside redis-cache file export only client
 * after that you can see redis connected or not
 */
// require('./middleware/redis-cache')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
logger('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Handling the cors policy
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api', apiRouter);
app.use('/', indexRouter);
/**
 * Handling invalid url request
 */
app.use((req, res, next) => {
  let error = new Error('URL Not Found');
  error.status = 404;
  // next(error);
  res.json({
    statusCode: error.status,
    Code: 0,
    message: error.message
  })
});
/**
 * Error handling
 */
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})
module.exports = app;
