var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

var { booksData, membersData } = require('./seedData');

var BookType = require('./types/BookType');
var MemberType = require('./types/MemberType');

var fakeDatabase = {
  booksData: booksData,
  membersData: membersData,
};

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: () => { return booksData }
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve: () => { return membersData }
    },
  }),
});

let AppSchema = new GraphQLSchema({
  query: QueryType
});

// The root provides a resolver function for each API endpoint
// here, we use setTimeout to show that a resolver handles async in a promise
var root = {
  books: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(booksData), 1000);
    });
  },
  // getBooksByCategory: ({ category }) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => resolve(booksData.filter(book => book.category === category)), 1000);
  //   });
  // },
  members: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(membersData), 1000);
    });
  },
  // createBook: ({ input }) => {
  //   const latestId = fakeDatabase.booksData[fakeDatabase.booksData.length - 1].id;
  //   const newBook = {
  //     id: latestId + 1,
  //     title: input.title,
  //     category: input.category,
  //     author: input.author,
  //     borrowCount: 0,
  //     pageCount: 0,
  //     createdAt: new Date(),
  //     updatedAt: null,
  //     deletedAt: null,
  //   };
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       fakeDatabase.booksData.push(newBook);
  //       resolve(newBook);
  //     }, 1000);
  //   });
  // }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: AppSchema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
