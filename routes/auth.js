const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

// create an account
authRouter.post('/', authController.createAccount);


module.exports = authRouter;    // export to use in index.js
