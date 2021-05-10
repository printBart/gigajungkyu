const Message = require("../../models/Message");
const User = require("../../models/User");

module.exports = {
    getAllMessagesByRoom: async({senderToken, receiverToken}) => {
        try{
            const room = senderToken < receiverToken ? senderToken + receiverToken : receiverToken + senderToken;
            const messages = await Message.find({room});
            console.log(messages);

            return messages;

        } catch(err){
            throw err;
        }
    },

    createMessage: async({senderToken, receiverToken, message}) => {
        const sender = await User.findOne({token: senderToken});
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
    }
}