const mongoose = require('mongoose');

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${
            process.env.MONGO_PASSWORD}@gigajungkyu.pipwm.mongodb.net/${
            process.env.MONGO_DB}?retryWrites=true&w=majority
            `
        ).then((res, err) => {
            if(err) return reject(err);
            resolve();
        });
    })
}

function disconnect() {
    return mongoose.disconnect();
}

function con(){
}

module.exports = { connect, disconnect, con };