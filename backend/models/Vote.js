const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Vote', voteSchema);