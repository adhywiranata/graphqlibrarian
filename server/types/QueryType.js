var {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

var BookType = require('./BookType');
var NewBookInputType = require('./NewBookInputType');
var MemberType = require('./MemberType');

var fakeDatabase = require('../fakeDatabase');

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(fakeDatabase.booksData), 1000);
        });
      },
    },
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
          setTimeout(() => resolve(fakeDatabase.booksData.filter(book => book.category === category)), 1000);
        });
      },
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(fakeDatabase.membersData), 1000);
        });
      }
    },
  }),
});

module.exports = QueryType;
