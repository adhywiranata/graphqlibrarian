var {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql');

let BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book object',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    borrowCount: {
      type: GraphQLInt,
    },
    pageCount: {
      type: GraphQLInt,
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
    deletedAt: {
      type: GraphQLString,
    },
  }),
});

module.exports = BookType;
