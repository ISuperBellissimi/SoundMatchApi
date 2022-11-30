// print all songs
const getSongs = (req, res, next) => {
  res.json({message: req.params.user_id + " GET songs"});
};

// add song
const newSong = (req, res, next) => {
  res.json({message: "POST new song"});
};

// delete all songs
const deleteSongs = (req, res, next) => {
  res.json({message: "DELETE songs"});
};



// get one song
const getSong = (req, res, next) => {
  res.json({message: "GET song " + req.params.title });
};

// modify one song
const modifySong = (req, res, next) => {
  res.json({message: "Modify song " + req.params.title });
};

// delete one song
const deleteSong = (req, res, next) => {
  res.json({message: "DELETE song " + req.params.title });
};

module.exports = {
  getSongs,
  newSong,
  deleteSongs,
  getSong,
  modifySong,
  deleteSong
};
