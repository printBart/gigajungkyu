const { expect } = require("chai");
const usersResolver = require('../graphql/resolver/users');
const messageResolver = require('../graphql/resolver/message');
const conn = require('../utils/connection');
describe("Users", () => {
    let user1 = {};
    let user2 = {};
    beforeEach(() => {
        conn.connect().then(() =>{
            const validUser1 = {token: "token1", email: "user1@gmail.com", faculty: "Computer Engineering", emoji: "⭐"}
            usersResolver.registerUser(validUser1).then((savedUser) => {
                user1 = savedUser;
                done();
            });
            const validUser2 = {token: "token2", email: "user2@gmail.com", faculty: "Computer Science", emoji: "⭐"}
            usersResolver.registerUser(validUser2).then((savedUser) => {
                user2 = savedUser;
                done();
            });
        })
        .catch((err) => done(err));
    })

    describe("create message", () => {
        it("should throw error if sendertoken is null", () => {
            messageResolver.createMessage({senderToken: null, receiverToken: user2?.token, message: "hi"}).then((message) => {
                expect(message).to.throw("Expect value of type String, found null");
            });
        });
        it("should throw if receiverToken is null", () => {
            messageResolver.createMessage({senderToken: user1?.token, receiverToken: null, message: "hi"}).then((message) => {
                expect(message).to.throw("Expect value of type String, found null");
            });
        });
        it("should throw error if message length is 0", () => {
            messageResolver.createMessage({senderToken: user1?.token, receiverToken: user2?.token, message: ""}).then((message) => {
                expect(message).to.throw("Message must have a greater or equal to length than 1 character(s)");
            });
        });
        it("should throw error if message length is 0", () => {
            messageResolver.createMessage({senderToken: user1?.token, receiverToken: user2?.token, message: "hi"}).then((message) => {
                expect(message).to.not.be.undefined();
                expect(message.senderToken).to.equal(user1?.token);
                expect(message.receiverToken).to.equal(user2?.token);
                expect(message.message).to.equal("hi");
            });
        });
        it("should throw error if message length is 0", () => {
            messageResolver.createMessage({senderToken: user1?.token, receiverToken: user2?.token, message: ""}).then((messages) => {
                expect(messages).to.throw("Message must have a greater or equal to length than 1 character(s)");
            });
        });
    });

    describe("get all messages by roomId", () => {
        it("should not get all the messages by roomId if sendertoken is null", () => {
            messageResolver.getAllMessagesByRoom({senderToken: null, receiverToken: user2?.token}).then((messages) => {
                expect(messages).to.throw("Expect value of type String, found null");
            });
        });
        it("should not get all the messages by roomId if receiverToken is null", () => {
            messageResolver.getAllMessagesByRoom({senderToken: user1?.token, receiverToken: null}).then((messages) => {
                expect(messages).to.throw("Expect value of type String, found null");
            });
        });
        it("should return empty array if sender_token is invalid", () => {
            messageResolver.getAllMessagesByRoom({senderToken: "invalid_token", receiverToken: user2?.token}).then((messages) => {
                expect(messages).to.equal([]);
            });
        });
    });
});