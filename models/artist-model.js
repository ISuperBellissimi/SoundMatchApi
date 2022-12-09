const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String},
  songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
  isartist: {type: Boolean, default: true}
}, {collection: 'artists'});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;
