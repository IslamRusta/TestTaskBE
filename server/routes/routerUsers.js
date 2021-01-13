const express = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middleware');

const routerUsers = express.Router();

routerUsers.post('/signin', userMiddleware.userCreateValidation, userController.authUser);

module.exports = routerUsers;
