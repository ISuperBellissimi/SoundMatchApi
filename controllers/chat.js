const express = require('express');
const router = express.Router();
const Chat = require('../models/chat-model'); // get our mongoose model

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

// get list of all chats from an user
const getChats = async function (req,res,next) {
  let chats;

  // finding all chats from user through user_id
  if(req.query.user_id) {
      chats = await Chat.find({
          _id: req.query.user_id
      }).exec()
  }
  else
    chats = await Chat.find({}).exec();
  
  chats = chats.map((chat) => {
      return {
          self: '/api/v0/chat/' + chat.id,
          user: '/api/v0/user/' + chat.user,
          receiver: '/api/v0/receiver/' + chat.receiver
      }
  });
  res.status(200).json(chats);
}

// print all messages
const getTexts = async function (req, res, next) {
  let chat;

  // finding specific chat from user through user_id and chat_id
  if(req.query.user_id) {
    chat = await Chat.find({
        _id: req.query.user_id,
        chat_id: req.query.chat_id
    }).exec();
  }
  else
    chat = await Chat.find({}).exec();
  res.status(200).json({
    self: '/api/v0/chat/' + chat.id,
    user: '/api/v0/user/' + chat.user,
    receiver: '/api/v0/receiver/' + chat.receiver,
    messages: chat.messages,
    updated_at: chat.updated_at
  });
};
  
// add message
const newText = async function (req, res, next) {
  let chat;

  // finding specific chat from user through user_id and chat_id
  if(req.query.user_id) {
    chats = await Chat.find({
        _id: req.query.user_id,
        chat_id: req.query.chat_id
    }).exec();
  }
  if(!chat) {
      res.status(404).send()
      console.log('chat not found')
      return;
  }
  let text = await req.body.text;

  // adding text to the chat
  chat.updateOne(
      {_id: req.params.chat_id},
      {$push: {messages: text}}
  )
};
  
// delete one message
const deleteText = async function (req, res, next) {
  let chat;

  // finding specific chat from user through user_id and chat_id
  if(req.query.user_id) {
    chat = await Chat.find({
        _id: req.query.user_id,
        chat_id: req.query.chat_id
    }).exec();
  }
  if(!chat) {
      res.status(404).send()
      console.log('chat not found')
      return;
  }
  let text = await req.body.text;

  // deleting text to the chat
  chat.updateOne(
      {_id: req.params.id},
      {$pull: {messages: text}}
  )
};

// delete a specific chat
const deleteChat = async function(req,res,next) {
  let chat;
  // finding specific chat from user through user_id and chat_id
  if(req.query.user_id) {
    chats = await Chat.find({
        _id: req.query.user_id,
        chat_id: req.query.chat_id
    }).exec();
  }
  if (!chat) {
      res.status(404).send()
      console.log('chat not found')
      return;
  }
  await chat.deleteOne()
  console.log('chat removed')
  res.status(204).send()
}
  
const post = async function(req,res,next) {
  let chat = new Chat({
    _id: req.query.user_id,
    chat_id: req.query.chat_id
  });

  chat = await chat.save();

  let chatId = chat.id;
  console.log("Chat saved successfully");
  res.location("/api/v0/chat/" + chatId).status(201).send();
}

module.exports = {
  getChats,
  getTexts,
  newText,
  deleteText,
  deleteChat,
  post
};