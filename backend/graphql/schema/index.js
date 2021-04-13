const { buildSchema } = require('graphql');
module.exports = buildSchema(`

type User{
    _id: ID!
    token: String!
    email: String!
    username: String!
    faculty: String
    points: Float!
}

type Post{
    _id: ID!
    title: String!
    description: String!
    creator: User!
    latitude: Float!
    longitude: Float!
    emoji: String!
    date: String
    isNightmode: Boolean
}

type Comment{
    _id: ID!
    description: String!
    creator: User
    latitude: Float!
    longitude: Float!
    date: String
    post: Post!
    parentComment: Comment
    childComments: [Comment]!
}

type Vote {
    _id: ID!
    voter: User!
    post: Post!
    value: Int!
    date: String!
}

type RootQuery{
    getUserByToken(token: String!): User!
    getAllPosts: [Post]!
    getAllCommentsByPostId(postId: String!): [Comment]!
    getChildCommentsByCommentId(commentId: String!): [Comment]!
    getAllRecentComments: [Comment]!
}

type RootMutation{
    registerUser(token: String!, email: String!, faculty: String):  User!
    createPost(title: String!, description: String!, creator: String, latitude: Float!, longitude: Float!, emoji: String!, isNightmode: Boolean): Post!
    createComment(description: String!, creator: String!, latitude: Float!, longitude: Float!, postId: String!, parentComment: String): Comment!
    voteThread(voter: String!, thread: String!, value: Int!): Vote!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);