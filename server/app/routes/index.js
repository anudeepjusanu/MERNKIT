var express = require('express');
var requirement_route = require('./requirement_route');
const Router = express.Router();

exports = module.exports = Router;
Router.use('/requirement', requirement_route);
