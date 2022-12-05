const mongoose = require("mongoose");
const Genre = require('/genre-model.js');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favourite_genres: [Genre],
}, {collection: 'users'});

const User = mongoose.model("User", UserSchema);
module.exports = User;
