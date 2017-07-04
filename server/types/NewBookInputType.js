var {
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
} = require('graphql');

let NewBookInputType = new GraphQLInputObjectType({
  name: 'NewBookInput',
  description: 'input for creating new book',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    pageCount: {
      type: GraphQLInt,
    },
  }),
});

module.exports = NewBookInputType;
