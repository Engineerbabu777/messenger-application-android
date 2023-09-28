
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    friendRequests: [{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }],
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }],
    setRequests: [{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }]
});

const User = mongoose.models.user || mongoose.model('user', Schema);
module.exports =  User;