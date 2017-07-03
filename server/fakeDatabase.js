var { booksData, membersData } = require('./seedData');

var fakeDatabase = {
  booksData: booksData,
  membersData: membersData,
};

module.exports = fakeDatabase;
