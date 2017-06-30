var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var { booksData, membersData } = require('./seedData');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Book {
    id: ID!,
    title: String!,
    category: String!,
    author: String,
    borrowCount: Int,
    pageCount: Int,
    createdAt: String,
    updatedAt: String,
    deletedAt: String,
  }

  type BorrowingStatus {
    isBorrowing: Boolean,
    bookId: Int,
  }

  type Member {
    id: ID!,
    firstName: String!,
    lastName: String,
    age: Int,
    borrowingStatus: BorrowingStatus,
    createdAt: String,
    updatedAt: String,
    deletedAt: String,
  }

  type Query {
    books: [Book],
    members: [Member],
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  books: () => {
    return booksData;
  },
  members: () => {
    return membersData;
  }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
