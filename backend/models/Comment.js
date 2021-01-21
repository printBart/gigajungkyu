const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: false,
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
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    childComments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
});

module.exports = mongoose.model('Comment', postSchema);