const { expect } = require("chai");
const usersResolver = require('../graphql/resolver/users');
const conn = require('../utils/connection');
describe("Users", () => {
    beforeEach(() => {
        conn.connect().then(() => done())
        .catch((err) => done(err));
    })

    describe("User Registration", () => {
        it("should not register a user if token is null", async() => {
            const tempUser = {token: null, email: "user@gmail.com", faculty: "Computer Engineering", emoji: "⭐"}
            usersResolver.registerUser(tempUser).then((user) => {
                expect(user).to.throw("Expect value of type String, found null");
            });
        });

        it("should not register a user if email is invalid", async() => {
            const tempUser = {token: "token", email: "user1234", faculty: "Computer Engineering", emoji: "⭐"}
            usersResolver.registerUser(tempUser).then((user) => {
                expect(user).to.throw("Invalid email");
            });
        });

        it("should register a user", async() => {
            const tempUser = {token: "token", email: "user@gmail.com", faculty: "Computer Engineering", emoji: "⭐"}
            usersResolver.registerUser(tempUser).then((user) => {
                expect(user).to.throw("Invalid email");
            });
        });
    });

    describe("Get user by token", () => {
        const tempUser = {token: "token", email: "user@gmail.com", faculty: "Computer Engineering", emoji: "⭐"}
        const user = usersResolver.registerUser(tempUser);
        it("should not get token if userId is null", async() => {
            usersResolver.getUserByToken({token: null}).then((token) => {
                expect(token).to.throw("Expect value of type String, found null");
            });
        });
        it("should return empty object if not found", async() => {
            usersResolver.getUserByToken({token: "temp"}).then((token) => {
                expect(token).to.equal({});
            });
        });
        it("should return token if found", async() => {
            usersResolver.getUserByToken({token: "temp"}).then((token) => {
                expect(token).to.equal(user);
            });
        });
    })
});