const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },

    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25,
        unique: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/jettng/image/upload/v1622987266/jgram%202.0/default.png'
    },

    role: {
        type: String,
        default: 'user'
    },

    gender: {
        type: String,
        default: 'male'
    },

    mobile: {
        type: String,
        default: ''
    },

    story: {
        type: String,
        default: '',
        maxLength: 200
    },

    website: {
        type: String,
        default: ''
    },

    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],

    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],

    saved: [
        {
            type: mongoose.Types.ObjectId, ref: 'user'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);