const fetchFromServer = (query, variables) => {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        input: variables,
      },
    }),
  }).then(res => res.json());
};

const getAllBooks = () => {
  var query = `
  query {
    books {
      ...bookFields
    }
  }

  fragment bookFields on Book {
    title
    author
  }
  `;

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
      ...bookFields
    }
  }

  fragment bookFields on Book {
    title
    author
  }
  `;

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

const createBook = (variables) => {
  const { title, category, author, pageCount } = variables;
  var mutation = `mutation {
    createBook(input: {
      title: "${title}",
      category: "${category}",
      author: "${author}",
      pageCount: ${pageCount},
    }) {
    	pageCount,
    	title,
      createdAt,
    }
  }`;

  fetchFromServer(mutation, variables).then(res => {
    var listWrapper = document.getElementById('book-list').getElementsByTagName('ul')[0];
    var listItem = document.createElement('li');
    listItem.innerHTML = `${res.data.createBook.title}`;
    listWrapper.appendChild(listItem);
  });
}

getAllBooks();
getBooksByCategory('Fiction');
getAllMembers();

const newBookForm = document.getElementById('add-book-form');

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('book-input-title').value;
  const author = document.getElementById('book-input-author').value;
  const category = document.getElementById('book-input-category').value;
  const pageCount = 5;
  const bookObj = {
    title,
    author,
    category,
    pageCount
  };

  document.getElementById('book-input-title').value = '';
  document.getElementById('book-input-author').value = '';
  document.getElementById('book-input-category').value = '';
  createBook(bookObj);
});
