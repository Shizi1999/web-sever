const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose
      .connect('mongodb://localhost:27017/shizi')
      .then(() => console.log('Connect database sucessfully'));
  } catch (error) {}
};

module.exports = connectDB;
