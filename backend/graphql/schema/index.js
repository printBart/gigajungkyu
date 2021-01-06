const { buildSchema } = require('graphql');
module.exports = buildSchema(`

type User{
    _id: ID!
    username: String!
}

type Post{
    _id: ID!
    title: String!
    description: String!
    creator: String!
    latitude: Float!
    longitude: Float!
    date: String
}

type Comment{
    _id: ID!
    description: String!
    creator: String!
    latitude: Float!
    longitude: Float!
    date: String
    post: Post!
    parentComment: Comment
    childComments: [Comment]!
}

type RootQuery{
    getUserByUsername(usernname: String!): User
    getAllPosts: [Post]!
    getAllCommentsByPostId(postId: String!): [Comment]!
    getChildCommentsByCommentId(commentId: String!): [Comment]!
}

type RootMutation{
    registerUser(username: String!): User!
    createPost(title: String!, description: String!, creator: String!, latitude: Float!, longitude: Float!, date: String): Post!
    createComment(description: String!, creator: String!, latitude: Float!, longitude: Float!, post: String!, parentComment: String): Comment!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);