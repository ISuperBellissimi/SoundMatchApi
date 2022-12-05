const mongoose = require("mongoose");
const Artist = require('/artist-model.js');
const Genre = require('/genre-model.js');

const SongSchema = new mongoose.Schema({
  title: String,
  collaborations: {type: [Artist], default: null},
  genres: [Genre],
  image: String,
}, {collection: 'songs'});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;