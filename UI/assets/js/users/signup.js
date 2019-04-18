const api = 'https://banka-andela-43.herokuapp.com/api/v1';
const signupForm = document.querySelector('#signup-form');

const registerUser = (event) => {
  event.preventDefault();
  const firstName = document.querySelector('#firstname').value.trim();
  const lastName = document.querySelector('#lastname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const type = document.querySelector('#type').value.trim();
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirmPassword');
  const userDetails = {
    firstName,
    lastName,
    email,
    type,
    password,
    confirmPassword,
  };

  const init = {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  fetch(`${api}/auth/signup`, init)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

signupForm.addEventListener('submit', registerUser);
