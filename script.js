function displayError(msg) {
  document.getElementById('error-msg').textContent = msg;
}


var turnBackButton = document.getElementById('mainPage');
var loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', function() {
  window.location.href = 'login.html';
});

turnBackButton.addEventListener('click', function(){
    window.location.href = 'index.html';
});


function searchBooks() {
  const searchQuery = document.getElementById('search-box').value.trim();

  if (searchQuery === '') {
    displayError('Please enter a search query');
    return;
  }

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const books = JSON.parse(xhr.responseText).items.map(item => {
        const book = {
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
          publisher: item.volumeInfo.publisher ? item.volumeInfo.publisher : 'Unknown',
          publishedDate: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : 'Unknown'
        };
        return book;
      });
      displayBooks(books);
    } else {
      displayError('An error occurred while fetching books');
    }
  };
  xhr.onerror = function() {
    displayError('An error occurred while fetching books');
  }
  xhr.send();
}

function displayBooks(books) {
  const tableBody = document.querySelector('#books-table tbody');
  tableBody.innerHTML = '';

  books.forEach(book => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const publisherCell = document.createElement('td');
    publisherCell.textContent = book.publisher;
    row.appendChild(publisherCell);

    const publishedDateCell = document.createElement('td');
    publishedDateCell.textContent = book.publishedDate;
    row.appendChild(publishedDateCell);

    tableBody.appendChild(row);

  });
}

// Get the login and register forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Add event listener for login form submission
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginUser();
});

// Add event listener for register form submission
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  registerUser();
});

// Function to handle user login
function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('https://example.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    // Do something with the login response data
    console.log(data);
  })
  .catch(error => {
    displayError(`Error logging in: ${error}`);
  });
}

// Function to handle user registration
function registerUser() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;

  // Check that passwords match
  if (password !== confirm) {
    displayError('Passwords do not match');
    return;
  }

  fetch('https://example.com/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    // Do something with the registration response data
    console.log(data);
  })
  .catch(error => {
    displayError(`Error registering user: ${error}`);
  });
}

// Function to display error messages to the user
function displayError(msg) {
  document.getElementById('error-msg').textContent = msg;
}

