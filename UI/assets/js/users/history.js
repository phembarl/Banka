const url = 'https://banka-andela-43.herokuapp.com';

const table = document.querySelector('#table');
const modal = document.querySelector('.message-modal');
const loader = document.querySelector('.loader');
const wait = document.querySelector('.wait');
const errorMessage = document.querySelector('#errorMessage');
const pishicon = document.querySelector('.pishicon');

const firstNameValue = sessionStorage.getItem('firstName');
const lastNameValue = sessionStorage.getItem('lastName');

const token = sessionStorage.getItem('token');
const accountNumber = sessionStorage.getItem('accountNumber');

if (!token) {
  window.location.href = 'login.html';
}

modal.style.display = 'block';
loader.style.display = 'block';
wait.style.display = 'block';

const init = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': token,
  },
};

pishicon.setAttribute('src',
  `https://ui-avatars.com/api/?name=${firstNameValue}+${lastNameValue}&size=200&background=99e6e6&color=000`);

fetch(`${url}/api/v1/accounts/${accountNumber}/transactions`, init)
  .then(response => response.json())
  .then((data) => {
    if (data.status !== 200) {
      if (data.error) {
        loader.style.display = 'none';
        wait.style.display = 'none';
        errorMessage.textContent = data.error;
        errorMessage.style.display = 'block';
      }
    } else {
      const transactions = data.data;

      if (transactions[0]) {
        for (let i = 0; i < transactions.length; i += 1) {
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
      }

      modal.style.display = 'none';
      loader.style.display = 'none';
      wait.style.display = 'none';
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

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }
};
