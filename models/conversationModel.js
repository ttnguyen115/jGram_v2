const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'user' }],

    content: String,

    media: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('conversation', conversationSchema);