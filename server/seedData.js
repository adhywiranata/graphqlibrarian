const booksSeed = [
  {
    id: 1,
    title: 'How to kill a Mockingbird',
    category: 'Fiction',
    author: 'John Doe',
    borrowCount: 5,
    pageCount: 300,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: 2,
    title: 'How to kill a Dragon',
    category: 'Fiction',
    author: 'John Doe',
    borrowCount: 5,
    pageCount: 300,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const membersSeed = [
  {
    id: 1,
    firstName: 'Luke',
    lastName: 'Skywalker',
    age: 21,
    borrowingStatus: {
      isBorrowing: false,
      bookId: null,
    },
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

module.exports = {
  booksData: booksSeed,
  membersData: membersSeed,
};
