const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compass = require('node-compass');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('config');
const setCurrentRoute = require('./middlewares/setCurrentRoute');
const serveStatic = require('serve-static');

const setCustomCacheControl = (res, path) => {
    if (path.includes('acme-challenge')) {
        // content type is set for acme ssl controls
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
}

const mongo_user = config.get('mongo_user');
const mongo_password = config.get('mongo_password');
const mongo_host = config.get('mongo_host');
const mongo_port = config.get('mongo_port');
const mongo_db = config.get('mongo_db');

const index = require('./routes/index');
const services = require('./routes/services');
const about = require('./routes/about');
const gallery = require('./routes/gallery');
const shop = require('./routes/shop');
const privacy = require('./routes/privacy');

const app = express();

// Set up mongoose connection

const mongoDB = `mongodb://${mongo_user}:${mongo_password}@${mongo_host}:${mongo_port}/${mongo_db}`;

mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.info('connected to mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'bidolu',
    saveUninitialized: true,
    resave: true
}));
app.use(cookieParser());
app.use(compass({ mode: 'expanded' }));
app.use(serveStatic(path.join(__dirname, 'public'), {
    setHeaders: setCustomCacheControl
}));

// setCurrentRoute middleware sets the url variable to help navigation menus decide which one to set as active menu
app.use(setCurrentRoute);
app.use('/', index);
app.use('/hizmetler', services);
app.use('/hakkimizda', about);
app.use('/galeri', gallery);
app.use('/satin-alma', shop);
app.use('/gizlilik', privacy);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
