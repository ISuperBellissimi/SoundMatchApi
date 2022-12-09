const express = require('express');
const textRouter = express.Router();
const textController = require('../controllers/chat');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

textRouter.post('', textController.post);

// get all chats
textRouter.get('', textController.getChats);

// get all messages
textRouter.get('/chat_id/:chat_id', textController.getTexts);

// add message
textRouter.post('/chat_id/:chat_id', textController.newText);

// delete a message
textRouter.delete('/text_id/:text_id', textController.deleteText);

//delete a chat
textRouter.delete('/chat_id/:chat_id', textController.getChats);

module.exports = textRouter;    // export to use in index.js
