const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: false,
    },
    emoji: {
        type: String,
        required: false,
    },
    points: {
        type: Number,
        required: true,
    },
    ghostmode:{
        type: Boolean,
        required: false,
    }
});

module.exports = mongoose.model('User', userSchema);