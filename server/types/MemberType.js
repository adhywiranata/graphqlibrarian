var {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} = require('graphql');

let BorrowingStatusType = new GraphQLObjectType({
  name: 'BorrowingStatus',
  description: 'Borrowing Status object',
  fields: () => ({
    isBorrowing: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    bookId: {
      type: GraphQLInt,
    },
  }),
});

let MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'Member object',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    borrowingStatus: {
      type: BorrowingStatusType,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: GraphQLString,
    },
    deletedAt: {
      type: GraphQLString,
    },
  }),
});

module.exports = MemberType;
