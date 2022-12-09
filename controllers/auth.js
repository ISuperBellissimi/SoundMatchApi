const mongoose = require("mongoose");
const User = require('../models/general-user-model'); //to import the routes/song.js


// create an account
const createAccount = (req, res, next) => {
  res.json({message: "Account created"});
  console.log(mongoose.connection.readyState);

  const user = new User({ name: 'Nicolas Torriglia', age: 32 });
    user.save(function (err) {
      if (err) return console.log(err);
      // saved!
      console.log("user saved");
    });
};

module.exports = {
  createAccount
};