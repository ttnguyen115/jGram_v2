const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Types.ObjectId, ref: 'conversation' },

    sender: { type: mongoose.Types.ObjectId, ref: 'user' },

    recipient: { type: mongoose.Types.ObjectId, ref: 'user' },

    content: String,

    media: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('message', messageSchema);