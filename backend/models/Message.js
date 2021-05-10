const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderToken: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverToken: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message:{
        type: String,
        required: true
    },
    room:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Message', messageSchema);