const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    message_body: {type: String, default: null},
    message_status: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
})

const ChatSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    messages: [{type: Message}],
    updated_at: {type: Date, deafault: Date.now},
}, {collection: 'chats'});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;