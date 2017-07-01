var schemaMemberType = `
  type Member {
    id: ID!,
    firstName: String!,
    lastName: String,
    age: Int,
    borrowingStatus: BorrowingStatus,
    createdAt: String,
    updatedAt: String,
    deletedAt: String,
  }
`;

var schemaBorrowingStatusType = `
  type BorrowingStatus {
    isBorrowing: Boolean,
    bookId: Int,
  }
`;

var memberQueries = `
  members: [Member],
`;

module.exports= {
  schemaMemberType,
  schemaBorrowingStatusType,
  memberQueries,
};
