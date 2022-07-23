const express = require('express');
const accountRouter = express.Router();
const AccountController = require('../app/controllers/AccountController');

accountRouter.post('/login', AccountController.login);
accountRouter.post('/register', AccountController.register);
accountRouter.post('/resendcode', AccountController.resendCode);
accountRouter.post('/verify', AccountController.verify);
accountRouter.post('/forgetpassword', AccountController.forgetpassword);
accountRouter.post('/repassword', AccountController.repassword);
accountRouter.get('/users', AccountController.getUser);
accountRouter.get('/userscount', AccountController.getUserCount);

module.exports = accountRouter;
