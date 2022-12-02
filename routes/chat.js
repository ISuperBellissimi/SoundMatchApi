const express = require('express');
const textRouter = express.Router();
const textController = require('../controllers/chat.js');

// get all messages
textRouter.get('/chat_id/:chat_id', textController.getTexts);

// add message
textRouter.post('', textController.newText);

// delete a message
textRouter.delete('/text_id/:text_id', textController.deleteText);

module.exports = textRouter;    // export to use in index.js
