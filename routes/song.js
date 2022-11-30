const express = require('express');
const songRouter = express.Router();
const songController = require('../controllers/song.js');

songRouter.get('', songController.getSongs);

// print all songs
songRouter.get('/user/:user_id/', songController.getSongs);

// add song
songRouter.post('/user/:user_id/', songController.newSong);

// delete all songs
songRouter.delete('/user/:user_id/', songController.deleteSongs);

// show a song
songRouter.get('/:user/song/:title', songController.getSong);

// modify a song
songRouter.post('/:user/song/:title', songController.modifySong);

// delete a song
songRouter.delete('/:user/song/:title', songController.deleteSong)

module.exports = songRouter;    // export to use in index.js
