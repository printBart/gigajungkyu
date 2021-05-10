const express = require('express');
const bodyParser = require('body-parser');
const graphHttp = require('express-graphql');
const mongoose = require('mongoose');

//graphql
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');

const app = express();
const server = app.listen(8080)
const io = require('socket.io')(server, {cors: {origin: '*'}, reconnection:false});
var onlineUsers = [];

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
    io.on("connection", (socket)=>{
        console.log("User Conntected", socket.id);

        /*socket.on('postThread', (message) => {
            console.log("post Thread backend");
            graphqlResolver.createPost(message).then(() => {
                graphqlResolver.getAllPosts().then(posts => {
                    io.emit('getAllPosts', posts);
                });
            });
        });*/

        socket.on('joinDMRoom', ({ senderToken, receiverToken }) => {
            const room = senderToken < receiverToken ? (senderToken + receiverToken) : (receiverToken + senderToken);
            console.log(room);
            socket.join(room);
            console.log("joined");
            io.in(room).emit('message', {senderToken, message : senderToken + " has joined!"});
        });

        socket.on('sendMessage', ({senderToken, receiverToken, message}) => {
            const room = senderToken < receiverToken ? senderToken + receiverToken : receiverToken + senderToken;
            graphqlResolver.createMessage({senderToken, receiverToken, message}).then((message) => {
                console.log(message);
                io.in(room).emit('message',  message); 
            });
        })

        socket.on('leaveDMRoom', ({senderToken, receiverToken}) => {
            const room = senderToken < receiverToken ? senderToken + receiverToken : receiverToken + senderToken;
            socket.leave(room);
            console.log("left");
            io.in(room).emit('message', {senderToken, message : senderToken + " has Left!"});
        });

        socket.on("commentThread", (commentData) => {
            io.emit('displayCreatedComment', commentData); 
        });

        socket.on("postThread", (thread) => {
            graphqlResolver.getAllRecentPosts().then((posts) => {
                io.emit("displayLivePosts", posts);
            })
        })

        socket.on("sendUserLocation", (userLocationData) => {
            var userMovedIndex = onlineUsers.findIndex(user => user.token === userLocationData.userToken);
            
            if(userMovedIndex>-1){
                onlineUsers[userMovedIndex].longitude = userLocationData.longitude;
                onlineUsers[userMovedIndex].latitude = userLocationData.latitude;
                io.emit("displayCurrentUsers", onlineUsers);
            }
            else{
                graphqlResolver.getUserByToken({token: userLocationData.userToken}).then((user) => {                    const userData = {
                        ...user._doc,
                        longitude: userLocationData.longitude,
                        latitude: userLocationData.latitude
                    }
                    onlineUsers.push(userData);
                    io.emit("displayCurrentUsers", onlineUsers);
                });
            };
        });

        socket.on('disconnect', () => {
            console.log("disconnected user");
        });
    });
    
}).catch(err => {
    console.log(err);
})