const url = 'https://banka-andela-43.herokuapp.com';
const loginForm = document.querySelector('#login-form');

const login = (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const userDetails = {
    email,
    password,
  };

  const modal = document.querySelector('.message-modal');
  const errors = document.querySelector('#error-list');
  const loader = document.querySelector('.loader');
  const wait = document.querySelector('.wait');
  const errorMessage = document.querySelector('#errorMessage');
  const successMessage = document.querySelector('#successMessage');

  const validLogin = () => {
    let errorCount = 0;

    if (userDetails.email === '') {
      emailInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      emailInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (userDetails.password === '') {
      passwordInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      passwordInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (errorCount === 0) {
      return true;
    } return false;
  };

  if (validLogin()) {
    modal.style.display = 'block';
    loader.style.display = 'block';
    wait.style.display = 'block';

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    fetch(`${url}/api/v1/auth/signin`, init)
      .then(response => response.json())
      .then((data) => {
        if (data.status !== 200) {
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
        } else {
          const user = data.data[0];
          sessionStorage.setItem('token', user.token);
          sessionStorage.setItem('id', user.id);
          sessionStorage.setItem('firstName', user.firstName);
          sessionStorage.setItem('lastName', user.lastName);
          sessionStorage.setItem('email', user.email);

          const userEmail = sessionStorage.getItem('email');
          const userToken = sessionStorage.getItem('token');
          const accountsInit = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': userToken,
            },
          };

          loader.style.display = 'none';
          wait.style.display = 'none';
          successMessage.innerHTML = `Welcome ${data.data[0].firstName} <i class="fas fa-door-open"></i> <p><i class="fas fa-spinner fa-spin success-loader"></i></p>`;
          successMessage.style.display = 'block';

          fetch(`${url}/api/v1/user/${userEmail}/accounts`, accountsInit)
            .then(response => response.json())
            .then((accountsData) => {
              sessionStorage.setItem('accountNumber', accountsData.data[0].accountnumber);
              sessionStorage.setItem('accountType', accountsData.data[0].type);
              sessionStorage.setItem('balance', accountsData.data[0].balance);

              if (accountsData.data[0].length === 0) {
                setTimeout(() => {
                  window.location.href = 'create.html';
                }, 1500);
              }
            })
            .catch(error => error);

          setTimeout(() => {
            window.location.href = 'dashboard.html';
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

loginForm.addEventListener('submit', login);