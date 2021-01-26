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
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    latitude:{
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    emoji: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    isNightmode: {
        type: Boolean,
        required: false,
    }
});

module.exports = mongoose.model('Post', postSchema);