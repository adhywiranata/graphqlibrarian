var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var { booksData, membersData } = require('./seedData');
var { schemaBookType, schemaNewBookInput, bookQueries, bookMutations } = require('./schemas/bookSchema');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  ${schemaBookType}
  ${schemaNewBookInput}
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
    ${bookQueries}
    members: [Member],
  }

  type Mutation {
    ${bookMutations}
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
