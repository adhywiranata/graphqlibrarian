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

  input NewBookInput {
    title: String!,
    category: String!,
    author: String,
    pageCount: Int,
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
    getBooksByCategory(category: String!): [Book]
    members: [Member],
  }

  type Mutation {
    createBook(input: NewBookInput): Book
  }
`);

var fakeDatabase = {
  booksData: booksData,
  membersData: membersData,
};

// The root provides a resolver function for each API endpoint
var root = {
  books: () => {
    return booksData;
  },
  getBooksByCategory: ({ category }) => {
    return booksData.filter(book => book.category === category);
  },
  members: () => {
    return membersData;
  },
  createBook: ({ input }) => {
    const latestId = fakeDatabase.booksData[fakeDatabase.booksData.length - 1].id;
    const newBook = {
      id: latestId + 1,
      title: input.title,
      category: input.category,
      author: input.author,
      borrowCount: 0,
      pageCount: 0,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };
    fakeDatabase.booksData.push(newBook);
    return newBook;
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
