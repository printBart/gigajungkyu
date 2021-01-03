const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    latitude:{
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
});

module.exports = mongoose.model('Post', postSchema);