const emailService = require('../../utils/emailService');
const User = require('../models/User');
const UserRegister = require('../models/UserRegister');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

class AccountController {
  // [POST]/signin
  login(req, res, next) {
    setTimeout(() => {
      const { email, password } = req.body;
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          res.json({
            code: 0,
            emailMessage: 'Email chưa được đăng ký',
          });
        } else {
          user = user.toObject();
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user.email, process.env.SECRET_KEY);
            res.json({
              code: 1,
              message: 'Successfully!',
              token,
            });
          } else {
            res.json({
              code: 2,
              passwordMessage: 'Sai mật khẩu!',
            });
          }
        }
      });
    }, 3000);
  }
  // [POST]/signup
  register(req, res, next) {
    setTimeout(() => {
      const { email, password } = req.body;
      User.findOne({ email: email })
        .then((user) => {
          if (user) {
            res.json({
              code: 0,
              message: 'Email đã được đăng ký',
            });
          } else {
            const hash = bcrypt.hashSync(password, saltRounds);
            const code = Math.floor(Math.random() * 8999) + 1000;
            UserRegister.findOneAndRemove({ email: email }).then(() => {
              const userRegister = new UserRegister({
                email: email,
                password: hash,
                code: code,
              });
              emailService.sentVerifyCode({
                receiverEmail: email,
                code,
              });
              userRegister.save().then(() => {
                res.json({
                  code: 1,
                  message: 'successfull',
                });
              });
            });
          }
        })
        .catch(next);
    }, 3000);
  }
  // [POST]/resendcode
  resendCode(req, res, next) {
    const { email } = req.body;
    const code = Math.floor(Math.random() * 8999) + 1000;
    UserRegister.findOneAndUpdate({ email }, { $set: { code: code } })
      .then(() => {
        emailService.sentVerifyCode({ receiverEmail: email, code });
      })
      .catch((err) => console.log(err));
  }
  // [POST]/verify
  verify(req, res, next) {
    setTimeout(() => {
      const { verifyCode, email } = req.body;
      UserRegister.findOne({ email: email })
        .then((user) => {
          if (user) {
            user = user.toObject();
            if (user.code === verifyCode) {
              const us = new User({
                email: user.email,
                password: user.password,
                role: 'user',
                avatar: '',
                address: '',
                isBlocked: false,
              });
              us.save().then(() => {
                UserRegister.findOneAndDelete({ email: email });
                res.json({
                  code: 1,
                  message: 'Successfully',
                });
              });
            } else {
              res.json({
                code: 2,
                message: 'Mã xác nhận không chính xác',
              });
            }
          } else {
            res.json({
              code: 0,
              message: 'Email chưa được đăng ký',
            });
          }
        })
        .catch((err) => console.log(err));
    }, 3000);
  }
  // [POST]/forgetpassword
  forgetpassword(req, res, next) {
    setTimeout(() => {
      const { email } = req.body;
      User.findOne({ email: email })
        .then((user) => {
          if (user) {
            user = user.toObject();
            const token = jwt.sign({ email }, process.env.SECRET_KEY, {
              expiresIn: '300s',
            });
            emailService.sentResetPasswordLink({
              receiverEmail: email,
              token,
            });
            res.json({
              code: 1,
              message: 'Sucessfully',
            });
          } else {
            res.json({
              code: 0,
              message: 'Email chưa được đăng kí.',
            });
          }
        })
        .catch((err) => console.log(err));
    });
  }
  // [POST]/repassword
  repassword(req, res, next) {
    const { token, password } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
      if (err) {
        res.json({
          code: 0,
          message: 'Token hết hạn',
        });
      } else {
        const newPasswordHash = bcrypt.hashSync(password, saltRounds);
        User.findOneAndUpdate(
          { email: user.email },
          { $set: { password: newPasswordHash } }
        ).then(() => {
          res.json({
            code: 1,
            message: 'Thành công',
          });
        });
      }
    });
  }
  // [GET]/userscount
  getUserCount(req, res, next) {
    const type = req.query.type;
    const isBlocked = type === 'blocked';
    User.countDocuments({ isBlocked: isBlocked }).then((count) => {
      res.json({
        count,
      });
    });
  }
  // [GET]/users
  getUser(req, res, next) {
    const type = req.query.type;
    const page = req.query.page;
    const isBlocked = type === 'blocked';
    const skip = page * 5;
    User.find({ isBlocked: isBlocked })
      .sort('name')
      .skip(skip)
      .limit(5)
      .exec((err, doc) => {
        if (err) {
        } else {
          res.json(doc);
        }
      });
  }
}

module.exports = new AccountController();
