const mongoose = require('mongoose');

// auto create id
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

UserSchema = new mongoose.Schema(
  {
    author: ObjectId,
    name: String,
    email: String,
    password: String,
    role: String,
    isBlocked: Boolean,
    avatar: String,
    address: String,
    phone: String,
    avatarName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
