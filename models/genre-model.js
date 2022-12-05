const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: String
}, {collection: 'genres'});

const Genre = mongoose.model("Genre", GenreSchema);
module.exports = Genre;
