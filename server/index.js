var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');

var AppSchema = require('./schema');

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: AppSchema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
