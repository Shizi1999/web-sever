const mongoose = require('mongoose');

UserRegisterSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    code: String,
  },
  { timestamps: true }
);

UserRegisterSchema.index({ createAt: 1 }, { expireAfterSeconds: 1800 });

module.exports = mongoose.model('UserRegister', UserRegisterSchema);
