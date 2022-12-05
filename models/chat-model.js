const mongoose = require("mongoose");
const User = require('/users-model.js');

const ChatSchema = new mongoose.Schema({
    users: [User],
    messages: [Message],
    updated_at: {type: Date, deafault: Date.now},
}, {collection: 'chats'});

const Message = new mongoose.Schema({
    from: {type: User, required: true},
    to: {type: User, required: true},
    message_body: String,
    message_status: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
})

const Chat = mongoose.model("Chat", ChatSchema);
monule.exports = Chat;