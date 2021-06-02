const { expect } = require("chai");
const commentResolver = require('../graphql/resolver/comment');
const postResolver = require('../graphql/resolver/post');
const usersResolver = require('../graphql/resolver/users');
const conn = require('../utils/connection');

describe("Comment", () => {
    let user = {};
    let post = {};
    beforeEach(() => {
        conn.connect().then(() =>{
            const validUser = {token: "token", email: "user1234", faculty: "Computer Engineering", emoji: "⭐"};
            usersResolver.registerUser(validUser).then((savedUser) => {
                user = savedUser;
                const validPost = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: -79.347015, emoji: "⭐"}
                postResolver.createPost(validPost).then((savedPost) => {
                    post = savedPost;
                });
                done();
            });
        })
        .catch((err) => done(err));
    })

    describe("Create Comment", () => {
        it("should not create a comment if comment description has less than 3 characters", async() => {
            const comment = {description: "d", creator: user, latitude: 43.651070, longitude: -79.347015}
            commentResolver.createComment(comment).then((comment) => {
                expect(comment).to.throw("Comment description must have a greater length than 3 characters");
            })
            
        });

        it("should not create a comment if latitude is less than -90", async() => {
            const comment = {description: "d", creator: user, latitude: -91, longitude: -79.347015}
            commentResolver.createComment(comment).then((comment) => {
                expect(comment).to.throw("Invalid latitude");
            });
        });

        it("should not create a comment if latitude is greater than 90", async() => {
            const comment = {title: "title", description: "description", creator: user, latitude: 91, longitude: -79.347015}
            commentResolver.createComment(comment).then((comment) => {
                expect(comment).to.throw("Invalid latitude");
            });
        });

        it("should not create a comment if longitude is greater than 180", async() => {
            const comment = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: 181}
            commentResolver.createComment(comment).then((comment) => {
                expect(comment).to.throw("Invalid longitude");
            });
        });

        it("should not create a comment if longitude is less than -180", async() => {
            const comment = {title: "title", description: "description", creator: user, latitude: 43.651070, longitude: -181}
            commentResolver.createComment(comment).then((comment) => {
                expect(comment).to.throw("Invalid longitude");
            });
        });


        it("should create a comment if inputs are valid", async() => {
            const comment = { description: "description", creator: user, latitude: 43.651070, longitude: -79.347015, post}
            commentResolver.createComment(comment).then((comment) => {
                expect(comment).to.not.be.undefined();
                expect(comment.description).to.equal("description");
                expect(comment.creator).to.equal(user);
                expect(comment.latitude).to.equal(43.651070);
                expect(comment.longitude).to.equal(-79.347015);
            });
        });
    });

    describe("Get all Comments by postId", () => {
        it("should throw error if postId is null", async() => {
            commentResolver.getAllCommentsByPostId({postId: null}).then((comments) => {
                expect(comments).to.throw("Expect value of type String, found null");
            })
        })
        it("should return empty array if postId is not found", async() => {
            commentResolver.getAllCommentsByPostId({postId: "invalid_post_id"}).then((comments) => {
                expect(comments).to.equal([]);
            })
        });
        it("should return comments by postId if valid ", async() => {
            const comment = { description: "description", creator: user, latitude: 43.651070, longitude: -79.347015, post}
            commentResolver.createComment(comment);
            commentResolver.getAllCommentsByPostId({postId: post?.id}).then((comments) => {
                expect(comment).to.not.be.undefined();
                expect(Array.isArray(comment)).to.equal(true);
                expect(comment.length).to.equal(1);
            })
        });
    });

    describe("Get all Recent Comments", () => {
        it("should get all comment created within 24 hours", async() => {
            commentResolver.getAllRecentComments().then((comment) => {
                expect(comment).to.not.be.undefined();
                expect(Array.isArray(comment)).to.equal(true);
            });
        });
    });
});