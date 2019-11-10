/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');
var { v1_base_path, secret, dburl } = require('../config');
var expressJwt = require('express-jwt');
const fs = require('fs');
const argv = require('./util/argv');
const path = require('path');
const port = require('./util//port');
var bodyParser = require('body-parser');
const setup = require('./middlewares/frontendMiddleware');
var session = require('express-session');
var cors = require('cors');
const { resolve } = require('path');
var mongoose = require('mongoose');
var rfs = require('rotating-file-stream');
var morganBody = require('morgan-body');
var Router = require('./app/routes/index');

const app = express();
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

app.use(bodyParser.json()); //parsing request body
morganBody(app);
morganBody(app, { stream: accessLogStream, noColors: true });
app.use(bodyParser.json()); //parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: secret, resave: false, saveUninitialized: true }));

// This code will add cache expire header for 1 day
app.get('/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=2592000');
  res.setHeader('Expires', new Date(Date.now() + 85000000).toUTCString());
  next();
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.get('/heartBeat', (req, res) => {
  res.send('OK');
});
//app.use('/app', require('./app/routes/app_routes'));
//app.use(v1_base_path, expressJwt({ secret: secret }).unless({ path: [v1_base_path + '/authenticate/register', v1_base_path + '/authenticate/login', v1_base_path + '/authenticate/token'] }), Router);
app.use(v1_base_path, Router);
// In production we need to pass these values in instead of relying on webpack
// setup(app, {
//   outputPath: resolve(process.cwd(), 'build'),
//   publicPath: '/',
// });
app.use('/sms', (req, res) => {
  fs.readFile('./sms.html', (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

app.use(cors({
  origin: process.env.CROSS_ORIGIN,
  exposedHeaders: [''],
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 404
}));

mongoose.connect(dburl);

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
