const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: {type: String},
  artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
  collaborations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}],
  genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  image: {type: String},
}, {collection: 'songs'});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;