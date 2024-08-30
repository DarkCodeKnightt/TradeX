// <!-- JavaScript code -->

  // Define an object to store user data
  const users = {};

  // Function to handle signup form submission
  function signUp() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the email is already registered
    if (users[email]) {
      alert('Email already registered. Please login.');
      return;
    }

    // Store user data
    users[email] = { email, password };
    alert('Sign up successful. Please login.');
  }

  // Function to handle login form submission
  function logIn() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the email exists and the password matches
    if (users[email] && users[email].password === password) {
      alert('Login successful.');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }

