const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var bodyParser = require('body-parser');

const uri = process.env.PRIVATE_KEY;

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        uri,
        {dbName: 'prova',
         useNewUrlParser: true,
         useUnifiedTopology: true
        },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));



const songRoutes = require('./routes/song'); //to import the routes/song.js
const authRoutes = require('./routes/auth'); //to import the routes/auth.js
const chatRoutes = require('./routes/chat'); //to import the routes/chat.js

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

/**
 * Authentication routing and middleware
 */
app.use('/auth', authRoutes);

// Protect chat endpoint
// access is restricted only to authenticated users
// a valid token must be provided in the request
//app.use('/song',tokenChecker);

/**
 * Resource routing
 */
app.use('/song', songRoutes); 
app.use('/chat', chatRoutes);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

// module.export = app;

app.listen(3000, () =>
  console.log('Demo app listening on port 3000!'),
);
