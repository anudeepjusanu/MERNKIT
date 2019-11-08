var express = require('express');
var authenticate_routes = require('./authenticate_routes');
var user_route = require('./user_routes');
const Router = express.Router();

exports = module.exports = Router;

Router.use('/authenticate', authenticate_routes);
Router.use('/users', user_route);
