var schemaBookType = `
  type Book {
    id: ID!,
    title: String!,
    category: String!,
    author: String,
    borrowCount: Int,
    pageCount: Int,
    createdAt: String,
    updatedAt: String,
    deletedAt: String,
  }
`;

var schemaNewBookInput = `
  input NewBookInput {
    title: String!,
    category: String!,
    author: String,
    pageCount: Int,
  }
`;

var bookQueries = `
books: [Book],
getBooksByCategory(category: String!): [Book]
`;

var bookMutations = `
createBook(input: NewBookInput): Book
`;

module.exports = {
  schemaBookType: schemaBookType,
  schemaNewBookInput: schemaNewBookInput,
  bookQueries: bookQueries,
  bookMutations: bookMutations,
};
