const url = 'https://banka-andela-43.herokuapp.com';
const signupForm = document.querySelector('#signup-form');

const registerUser = (event) => {
  event.preventDefault();
  const firstName = document.querySelector('#firstname').value.trim();
  const lastName = document.querySelector('#lastname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const type = document.querySelector('#type').value.trim();
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  const firstNameInput = document.querySelector('#firstname');
  const lastNameInput = document.querySelector('#lastname');
  const emailInput = document.querySelector('#email');
  const typeInput = document.querySelector('#type');
  const passwordInput = document.querySelector('#password');
  const confirmPasswordInput = document.querySelector('#confirmPassword');
  const userDetails = {
    firstName,
    lastName,
    email,
    type,
    password,
    confirmPassword,
  };

  const modal = document.querySelector('.message-modal');
  const errors = document.querySelector('#error-list');
  const loader = document.querySelector('.loader');
  const wait = document.querySelector('.wait');
  const errorMessage = document.querySelector('#errorMessage');
  const successMessage = document.querySelector('#successMessage');

  const validUser = () => {
    let errorCount = 0;

    if (userDetails.firstName === '') {
      firstNameInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      firstNameInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (userDetails.lastName === '') {
      lastNameInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      lastNameInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }


    if (userDetails.email === '') {
      emailInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      emailInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (userDetails.type === '') {
      typeInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      typeInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (userDetails.password === '') {
      passwordInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    }


    if (userDetails.confirmPassword === '') {
      confirmPasswordInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    }


    if (userDetails.password !== userDetails.confirmPassword) {
      passwordInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      confirmPasswordInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    }


    if (userDetails.password === userDetails.confirmPassword
      && userDetails.password.length > 1) {
      passwordInput.style.border = '1px solid rgba(0, 255, 255, .5)';
      confirmPasswordInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }
    if (errorCount === 0) {
      return true;
    } return false;
  };

  if (validUser()) {
    modal.style.display = 'block';
    loader.style.display = 'block';
    wait.style.display = 'block';
    const init = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`${url}/api/v1/auth/signup`, init)
      .then(response => response.json())
      .then((data) => {
        if (data.status !== 201) {
          if (data.error) {
            loader.style.display = 'none';
            wait.style.display = 'none';
            errorMessage.textContent = data.error;
            errorMessage.style.display = 'block';
          }

          if (data.errors) {
            for (let i = 0; i < data.errors.length; i += 1) {
              const err = document.createElement('li');
              err.appendChild(document.createTextNode(data.errors[i]));
              loader.style.display = 'none';
              wait.style.display = 'none';
              errors.appendChild(err);
              errors.style.display = 'block';
            }
          }
        } if (data.status === 201) {
          loader.style.display = 'none';
          wait.style.display = 'none';
          successMessage.innerHTML = 'Your account has been successfully created <i class="fas fa-check-circle"></i> <p><i class="fas fa-spinner fa-spin success-loader"></i></p>';
          successMessage.style.display = 'block';

          setTimeout(() => {
            window.location.href = 'login.html';
          }, 1500);
        }
      })
      .catch(error => error);
  }

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      errors.textContent = '';
      errorMessage.textContent = '';
      successMessage.textContent = '';
    }
  };
};

signupForm.addEventListener('submit', registerUser);
