//event listeners (front end stuff)
//fetch calls- listen to user, to trigger fetch call. fetch url has to match api urls

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log(email, password);

  if (email && password) {
    // Send a POST request to the login API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (email && password) {
    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// Assume that the server sets a cookie named "isLoggedIn" with the value "true" when the user is logged in

// Read the value of the "isLoggedIn" cookie
const isLoggedInCookie = document.cookie
  .split(';')
  .map(cookie => cookie.trim())
  .find(cookie => cookie.startsWith('isLoggedIn='));

// Check if the "isLoggedIn" cookie exists and its value is "true"
const isUserLoggedIn = isLoggedInCookie && isLoggedInCookie.split('=')[1] === 'true';

if (isUserLoggedIn) {
  // Display user data 
  document.getElementById('user-data').innerHTML = 'Welcome, User!';
} else {
  // Display a login/signup form or redirect to the login page
  document.getElementById('login-form');

}



document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
