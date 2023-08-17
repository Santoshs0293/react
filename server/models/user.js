const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "visitor"
  }
});

const UserModel = mongoose.model("user", UserSchema); // Use "User" as the model name, not "user"
module.exports = UserModel;