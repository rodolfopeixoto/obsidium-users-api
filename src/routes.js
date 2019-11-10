const express = require('express');
const UsersController = require('./controllers/UsersController');

const routes = express.Router();

routes.get('/users', UsersController.index);
routes.put('/users', UsersController.signUp);

module.exports = routes;