const express = require('express');
const bodyParser = require('body-parser');
const graphHttp = require('express-graphql');
const mongoose = require('mongoose');

//graphql
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');

const app = express();

//data size limit to 50mb per request
app.use(bodyParser.json({limit: '50mb', extended: true}));

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

//set graphql
app.use(
    '/graphql',
    graphHttp.graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    })
);

//mongoose connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD}@gigajungkyu.pipwm.mongodb.net/${
    process.env.MONGO_DB}?retryWrites=true&w=majority
    `
).then(() => {
    app.listen(8080);
}).catch(err => {
    console.log(err);
})
