const url = 'https://banka-andela-43.herokuapp.com';

const firstName = document.querySelectorAll('.firstName');
const lastName = document.querySelectorAll('.lastName');
const account = document.querySelector('.account');
const accountType = document.querySelector('.accountType');
const balance = document.querySelector('.balance');

const modal = document.querySelector('.message-modal');
const loader = document.querySelector('.loader');
const wait = document.querySelector('.wait');

const table = document.querySelector('#table');

const token = sessionStorage.getItem('token');
const firstNameValue = sessionStorage.getItem('firstName');
const lastNameValue = sessionStorage.getItem('lastName');
const accountNumber = sessionStorage.getItem('accountNumber');
const accountTypeValue = sessionStorage.getItem('accountType');
const balanceValue = sessionStorage.getItem('balance');

if (!token) {
  window.location.href = 'login.html';
}

modal.style.display = 'block';
loader.style.display = 'block';
wait.style.display = 'block';

for (let i = 0; i < firstName.length; i += 1) {
  firstName[i].textContent = firstNameValue;
}

for (let i = 0; i < lastName.length; i += 1) {
  lastName[i].textContent = lastNameValue;
}

account.textContent = accountNumber;
accountType.textContent = accountTypeValue;
balance.textContent = balanceValue;

const init = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': token,
  },
};

fetch(`${url}/api/v1/accounts/${accountNumber}/transactions`, init)
  .then(response => response.json())
  .then((data) => {
    const transactions = data.data;

    for (let i = transactions.length - 1; i >= (transactions.length - 5); i -= 1) {
      sessionStorage.setItem('date', transactions[i].createdon);
      sessionStorage.setItem('transactionType', transactions[i].type);
      sessionStorage.setItem('currency', transactions[i].transactioncurrency);
      sessionStorage.setItem('amount', transactions[i].amount);
      sessionStorage.setItem('oldBalance', transactions[i].oldbalance);
      sessionStorage.setItem('newBalance', transactions[i].newbalance);

      const row = table.insertRow(1);

      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);

      cell1.textContent = sessionStorage.getItem('date');
      cell2.textContent = sessionStorage.getItem('transactionType');
      cell3.textContent = sessionStorage.getItem('amount');
      cell4.textContent = sessionStorage.getItem('currency');
      cell5.textContent = sessionStorage.getItem('oldBalance');
      cell6.textContent = sessionStorage.getItem('newBalance');
    }

    modal.style.display = 'none';
    loader.style.display = 'none';
    wait.style.display = 'none';
  })
  .catch(error => error);
