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
});

module.exports = mongoose.model('User', userSchema);