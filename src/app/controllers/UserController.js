const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cloudinaryDeleteImage = require('../../utils/deleteImage');
class UserController {
  // [GET]/user
  getuser(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      const email = jwt.verify(token, process.env.SECRET_KEY);
      User.findOne({ email: email }).then((user) => {
        if (user) {
          user = user.toObject();
          res.json({
            code: 1,
            name: user.name,
            address: user.address,
            phone: user.phone,
            avatar: user.avatar,
            email: user.email,
          });
        }
      });
    } else {
      res.json({
        code: 0,
      });
    }
  }
  // [POST]/profile
  profile(req, res, next) {
    const token = req.headers.authorization;
    const { name, address, phone } = req.body;

    if (token) {
      const email = jwt.verify(token, process.env.SECRET_KEY);
      User.findOne({ email: email }).then((user) => {
        if (user) {
          user.name = name;
          user.address = address;
          user.phone = phone;
          if (req.file) {
            if (user.avatar === '') {
              user.avatar = req.file.path;
              user.avatarName = req.file.filename;
            } else if (user.avatar) {
              cloudinaryDeleteImage(user.avatarName);
              user.avatar = req.file.path;
              user.avatarName = req.file.filename;
            }
          }
          user.save().then((user) => {
            res.json({
              code: 1,
              avatar: user.avatar,
            });
          });
        }
      });
    } else {
      res.json({
        code: 0,
      });
    }
  }
}

module.exports = new UserController();
