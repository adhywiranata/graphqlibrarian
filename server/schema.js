var {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

var QueryType = require('./types/QueryType');
var MutationType = require('./types/MutationType');

let AppSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = AppSchema;
