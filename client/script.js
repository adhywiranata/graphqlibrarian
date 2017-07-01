const fetchFromServer = (query) => {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query
    }),
  }).then(res => res.json());
};

const mutateFromServer = (query, variables) => {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        input: variables
      }
    }),
  }).then(res => res.json());
};

const getAllBooks = () => {
  var query = `{
    books {
      title
    }
  }`;

  fetchFromServer(query).then(res => {
    var listWrapper = document.getElementById('book-list').getElementsByTagName('ul')[0];
    res.data.books.forEach(book => {
      var listItem = document.createElement('li');
      listItem.innerHTML = book.title;
      listWrapper.appendChild(listItem);
    });
  });
};

const getBooksByCategory = (category) => {
  var query = `{
    getBooksByCategory(category: "${category}") {
      title
    }
  }`;

  fetchFromServer(query).then(res => {
    var listWrapper = document.getElementById('categorized-book-list').getElementsByTagName('ul')[0];
    res.data.getBooksByCategory.forEach(book => {
      var listItem = document.createElement('li');
      listItem.innerHTML = book.title;
      listWrapper.appendChild(listItem);
    });
  });
};

const getAllMembers = () => {
  var query = `{
    members {
      firstName,
      lastName,
    }
  }`;

  fetchFromServer(query).then(res => {
    var listWrapper = document.getElementById('member-list').getElementsByTagName('ul')[0];
    res.data.members.forEach(member => {
      var listItem = document.createElement('li');
      listItem.innerHTML = `${member.firstName} ${member.lastName}`;
      listWrapper.appendChild(listItem);
    });
  });
};

const createMember = () => {
  var query = `mutation CreateBook($input: NewBookInput) {
    createBook(input: $input) {
      title,
    }
  }`;

  var variables = {
    title: "yess",
    author: "joe",
    category: "Fiction",
  };

  mutateFromServer(query, variables).then(res => {
    var listWrapper = document.getElementById('book-list').getElementsByTagName('ul')[0];
    var listItem = document.createElement('li');
    listItem.innerHTML = `${res.data.createBook.title}`;
    listWrapper.appendChild(listItem);
  });
}

getAllBooks();
getBooksByCategory('Fiction');
getAllMembers();

const addNewBookBtn = document.getElementById('add-new-book');

addNewBookBtn.addEventListener('click', () => {
  createMember();
});
