const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favourite_genres: [Genre],
  genres: [Genre],
  songs: {type: [Song], default: null},
  collaborations: {type: [Artists], default: null},
}, {collection: 'artists'});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;
