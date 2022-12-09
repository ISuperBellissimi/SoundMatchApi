const express = require('express');
const mongoose = require("mongoose");
const Song = require('../models/song-model'); // get our mongoose model
const User = require('../models/artist-model');

// print all songs
const getAllSongs = async function (req, res, next) {
  let songs = await Song.find({}).exec();

  songs = songs.map((dbEntry) => {
      return {
          title: '/api/v0/song/' + dbEntry.title,
          artist: '/api/v0/user/' + dbEntry.artist,
          collaborations: '/api/v0/collaborations/' + dbEntry.collaborations,
          genres: '/api/v0/genres/' + dbEntry.genres,
          image: dbEntry.image
      }
  })
  console.log(songs);
  res.status(200).json(songs);
};

// print all songs from an artist
const getSongs = async function (req, res, next) {
  let songs

  if(req.query.user_id) {
    songs = await Song.find({
        _id: req.query.user_id
    }).exec()
  }
  else
    songs = await Song.find({}).exec();

  songs = songs.map((dbEntry) => {
      return {
          title: '/api/v0/song/' + dbEntry.title,
          artist: '/api/v0/user/' + dbEntry.artist,
          collaborations: '/api/v0/collaborations/' + dbEntry.collaborations,
          genres: '/api/v0/genres/' + dbEntry.genres,
          image: dbEntry.image
      }
  })
  res.status(200).json(songs);
};


// add song
const newSong = async function (req, res, next) {
  let songs

  if(req.query.user_id) {
    songs = await Song.find({
        _id: req.query.user_id
    }).exec()
  }

  var song = await req.body.song;

  Song.updateOne(
    {_id: req.query.user_id},
    {$push: {
      songs: song
    }}
  )
  res.status(200).json({
    // title: '/api/v0/song/' + song.title,
    // artist: '/api/v0/user/' + song.artist,
    // collaborations: '/api/v0/collaborations/' + song.collaborations,
    // genres: '/api/v0/genres/' + song.genres,
    // image: song.image
  });
  console.log('song added')
};

// delete all songs
const deleteSongs = async function (req, res, next) {
  let songs

  if(req.query.user_id) {
    songs = await Song.find({
        _id: req.query.user_id
    }).exec()
  }

  await Song.remove({ _id: req.query.user_id})
  console.log('all songs deleted')
  res.status(200).send();
};

// get one song
const getSong = async function (req, res, next) {
  let song = await Song.findById(req.params.id).exec();
  if (!song) {
      res.status(404).send()
      console.log('song not found')
      return;
  }
  res.status(204).send()
};

// modify one song
const modifySong = async function(req, res, next) {
  let song = await Song.find({
    song_id: req.params.id,
    artist_id: req.params.artist_id
  }).exec();

  if(!song) {
    res.status(404).send()
    console.log('song not found')
    return;
  }

  // updating 
  const filter = {_id: song.id};
  const update = {title: song.title, genres: song.genres};
  Song.findOneAndUpdate(filter,update)
  console.log('song updated')
  res.status(201).send()
};

// delete one song
const deleteSong = async function (req, res, next) {
  // finding the song that contains song_id and artist_id
  // the artist_id must be the logged-in artist's id
  let song = await Song.find({
    song_id: req.params.id,
    artist_id: req.params.artist_id
  }).exec();

  if(!song) {
    res.status(404).send()
    console.log('song not found')
    return;
  }

  await Song.deleteOne({_id: song.id})
  console.log('song removed')
  res.status(204).send()
};

const post = async function (req,res,next) {
  let song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    collaborations: req.body.collaborations,
    genres: req.body.genres,
    image: req.body.image
  })

  song = await song.save();

  let songId = song.id;

  res.location("/api/v0/song/" + songId).status(201).send();
}

module.exports = {
  getAllSongs,
  getSongs,
  newSong,
  deleteSongs,
  getSong,
  modifySong,
  deleteSong,
  post
};
