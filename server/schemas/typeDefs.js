const { gql } = require('apollo-server-express');

// definition of types for graphQL 

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    description: String
    password: String
    savedBooks: [Book]
}
type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    link: String
    image: String
    title: String
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me: User
}
type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String], bookId: String, description: String!, image: String, link: String, title: String!): User
    deleteBook(bookId: String!): User
}
`;

module.exports = typeDefs;