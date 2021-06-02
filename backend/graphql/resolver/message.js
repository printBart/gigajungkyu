const Message = require("../../models/Message");
const User = require("../../models/User");
const { transformMessage } = require("./transformer");

module.exports = {
    getAllMessagesByRoom: async({senderToken, receiverToken}) => {
        try{
            const room = senderToken < receiverToken ? senderToken + receiverToken : receiverToken + senderToken;
            const messages = await Message.find({room});

            return messages.map(message => {
                return transformMessage(message);
            });

        } catch(err){
            throw err;
        }
    },

    createMessage: async({senderToken, receiverToken, message}) => {
        try{
        const sender = await User.findOne({token: senderToken});
            
        if(message == null || message.length < 1 ){
            throw "Message must have a greater or equal to length than 1 character(s)";
        }
    
        const receiver = await User.findOne({token: receiverToken});
        const room = senderToken < receiverToken ? senderToken + receiverToken : receiverToken + senderToken;

        const messageObj = await Message({
            senderToken: sender,
            receiverToken: receiver,
            message,
            room,
            date: new Date()
        });

        result = await messageObj.save();

        return result;
        } catch(err){
            throw err;
        }
    }
}