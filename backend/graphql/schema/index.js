const { buildSchema } = require('graphql');
module.exports = buildSchema(`

type User{
    _id: ID!
    username: String!
}

type RootQuery{
    getUserByUsername(usernname: String!): User 
}

type RootMutation{
    registerUser(username: String!): User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);