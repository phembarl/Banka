const url = 'https://banka-andela-43.herokuapp.com';
const accountForm = document.querySelector('#account-form');

const modal = document.querySelector('.message-modal');
const loader = document.querySelector('.loader');
const wait = document.querySelector('.wait');
const successMessage = document.querySelector('#successMessage');
const errorMessage = document.querySelector('#errorMessage');
const accountNumberInfo = document.querySelector('.num');
const accountTypeInfo = document.querySelector('.type');
const accountNumber = document.querySelector('.accountNumber');
const accountType = document.querySelector('.accountType');

const token = sessionStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const createAccount = (event) => {
  modal.style.display = 'block';
  loader.style.display = 'block';
  wait.style.display = 'block';
  successMessage.style.display = 'none';
  accountNumberInfo.style.display = 'none';
  accountTypeInfo.style.display = 'none';

  event.preventDefault();
  const type = document.querySelector('.sel').value.trim();

  const accountDetails = {
    type,
  };

  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(accountDetails),
  };

  fetch(`${url}/api/v1/accounts`, init)
    .then(response => response.json())
    .then((data) => {
      if (data.status !== 201) {
        if (data.error) {
          loader.style.display = 'none';
          wait.style.display = 'none';
          errorMessage.textContent = data.error;
          errorMessage.style.display = 'block';
        }
      } else {
        const account = data.data[0];
        successMessage.innerHTML = 'Yay! you have a new bank account <i class="fas fa-money-bill-wave"></i>';
        accountNumber.textContent = account.accountNumber;
        accountType.innerHTML = `${account.type} <p><i class="fas fa-spinner fa-spin success-loader"></i></p>`;
        accountNumberInfo.style.display = 'block';
        accountTypeInfo.style.display = 'block';
        successMessage.style.display = 'block';

        loader.style.display = 'none';
        wait.style.display = 'none';

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      }
    })
    .catch((error) => {
      if (error) {
        loader.style.display = 'none';
        wait.style.display = 'none';
        errorMessage.textContent = 'Oops! something went wrong. Check your Internet connection and try again';
        errorMessage.style.display = 'block';
      }
    });
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    successMessage.textContent = '';
    accountNumberInfo.style.display = 'none';
    accountTypeInfo.style.display = 'none';
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
  }
};

accountForm.addEventListener('submit', createAccount);
