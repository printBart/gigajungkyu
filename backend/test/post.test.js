const { expect } = require("chai");
const postResolver = require('../graphql/resolver/post');
const usersResolver = require('../graphql/resolver/users');
const conn = require('../utils/connection');

describe("Post", () => {
    let user = {};
    beforeEach(() => {
        conn.connect().then(() =>{
            const validUser = {token: "token", email: "user1234", faculty: "Computer Engineering", emoji: "⭐"}
            usersResolver.registerUser(validUser).then((savedUser) => {
                user = savedUser;
                done();
             });
        })
        .catch((err) => done(err));
    })

    describe("Create Post", () => {
        it("should not create a post if post title has less than 3 characters", async() => {
            const post = {title: "t", description: "description", creator: user, latitude: 43.651070, longitude: -79.347015, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Post title must have a greater length than 3 characters");
            })
            
        });

        it("should not create a post if post description has less than 3 characters", async() => {
            const post = {title: "title", description: "d", creator: user, latitude: 43.651070, longitude: -79.347015, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Post description must have a greater length than 3 characters");
            });
        });

        it("should not create a post if latitude is less than -90", async() => {
            const post = {title: "title", description: "description", creator: user, latitude: -91, longitude: -79.347015, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Invalid latitude");
            });
        });

        it("should not create a post if latitude is greater than 90", async() => {
            const post = {title: "title", description: "description", creator: user, latitude: 91, longitude: -79.347015, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Invalid latitude");
            });
        });

        it("should not create a post if longitude is greater than 180", async() => {
            const post = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: 181, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Invalid longitude");
            });
        });

        it("should not create a post if longitude is less than -180", async() => {
            const post = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: -181, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Invalid longitude");
            });
        });

        it("should not create a post if emoji is null", async() => {
            const post = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: -181, emoji: null}
            postResolver.createPost(post).then((post) => {
                expect(post).to.throw("Expect emoji value of type String, found null");
            });
        });

        it("should create a post if inputs are valid", async() => {
            const post = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: -79.347015, emoji: "⭐"}
            postResolver.createPost(post).then((post) => {
                expect(post).to.not.be.undefined();
                expect(post.title).to.equal("title");
                expect(post.description).to.equal("description");
                expect(post.creator).to.equal(user);
                expect(post.latitude).to.equal(43.651070);
                expect(post.longitude).to.equal(-79.347015);
                expect(post.emoji).to.equal("⭐");
            });
        });
    });

    describe("Get all Posts", () => {
        it("should get all post created prior", async() => {
            postResolver.getAllPosts().then((post) => {
                expect(post).to.not.be.undefined();
                expect(Array.isArray(post)).to.equal(true);
            });
        });
    });

    describe("Get all Recent Posts", () => {
        it("should get all post created within 24 hours", async() => {
            postResolver.getAllRecentPosts().then((post) => {
                expect(post).to.not.be.undefined();
                expect(Array.isArray(post)).to.equal(true);
            });
        });
    });
});