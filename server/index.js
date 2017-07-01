var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

var { booksData, membersData } = require('./seedData');

var BookType = require('./types/BookType');
var NewBookInputType = require('./types/NewBookInputType');
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
      resolve: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(booksData), 1000);
        });
      },
    },
    // newBookInput: {
    //   type: NewBookInputType,
    // },
    getBooksByCategory: {
      type: new GraphQLList(BookType),
      args: {
        category: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args) => {
        var category = args.category;
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(booksData.filter(book => book.category === category)), 1000);
        });
      },
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve: () => { return membersData }
    },
  }),
});

let MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createBook: {
      type: BookType,
      args: {
        input: {
          name: 'wow',
          type: NewBookInputType,
        },
      },
      resolve: (obj, args) => {
        const input = args.input;
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
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fakeDatabase.booksData.push(newBook);
            resolve(newBook);
          }, 1000);
        });
      },
    },
  }),
});

let AppSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

// The root provides a resolver function for each API endpoint
// here, we use setTimeout to show that a resolver handles async in a promise
// var root = {
//   // books: () => {
//   //   return new Promise((resolve, reject) => {
//   //     setTimeout(() => resolve(booksData), 1000);
//   //   });
//   // },
//   getBooksByCategory: ({ category }) => {
//     console.log(category);
//     return new Promise((resolve, reject) => {
//       setTimeout(() => resolve(booksData.filter(book => book.category === category)), 1000);
//     });
//   },
//   // members: () => {
//   //   return new Promise((resolve, reject) => {
//   //     setTimeout(() => resolve(membersData), 1000);
//   //   });
//   // },
//   // createBook: ({ input }) => {
//   //   const latestId = fakeDatabase.booksData[fakeDatabase.booksData.length - 1].id;
//   //   const newBook = {
//   //     id: latestId + 1,
//   //     title: input.title,
//   //     category: input.category,
//   //     author: input.author,
//   //     borrowCount: 0,
//   //     pageCount: 0,
//   //     createdAt: new Date(),
//   //     updatedAt: null,
//   //     deletedAt: null,
//   //   };
//   //   return new Promise((resolve, reject) => {
//   //     setTimeout(() => {
//   //       fakeDatabase.booksData.push(newBook);
//   //       resolve(newBook);
//   //     }, 1000);
//   //   });
//   // }
// };

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: AppSchema,
  // rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
