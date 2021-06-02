const express = require('express');
const bodyParser = require('body-parser');
const graphHttp = require('express-graphql');
const connection = require('./utils/connection');
const socketio = require('./socketio');

//graphql
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');

const app = express();
const PORT = 8080;
const server = app.listen(PORT)
const io = require('socket.io')(server, {cors: {origin: '*'}, reconnection:false});

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
connection.connect();
socketio.socketioConnection(server);