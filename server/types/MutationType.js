var {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

var BookType = require('./BookType');
var NewBookInputType = require('./NewBookInputType');

var fakeDatabase = require('../fakeDatabase');

let MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createBook: {
      type: BookType,
      args: {
        input: {
          name: 'input',
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

module.exports = MutationType;
