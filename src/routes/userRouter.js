const express = require('express');
const userRouter = express.Router();

const UserController = require('../app/controllers/UserController');
const uploadImage = require('../app/middlewares/uploadImage');

userRouter.get('/', UserController.getuser);
userRouter.post('/profile', uploadImage.single('file'), UserController.profile);

module.exports = userRouter;
