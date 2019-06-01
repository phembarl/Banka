const url = 'https://banka-andela-43.herokuapp.com';
const transactForm = document.querySelector('#cred-form');
const token = sessionStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const transact = (event) => {
  event.preventDefault();
  const transactTypeInput = document.querySelector('.sel');
  const accountNumberInput = document.querySelector('#accountNumber');
  const amountInput = document.querySelector('#amount');

  const transactType = document.querySelector('.sel').value;
  const accountNumber = document.querySelector('#accountNumber').value.trim();
  const amount = document.querySelector('#amount').value.trim();

  const modal = document.querySelector('.message-modal');

  //   start
  const accountNumberInfo = document.querySelector('.num');
  const transactionType = document.querySelector('.transactionType');
  const amountDiv = document.querySelector('.amountDiv');
  const balance = document.querySelector('.balance');

  const accountNumberValue = document.querySelector('.accountNum');
  const transactionTypeValue = document.querySelector('.transactionTypeValue');
  const amountValue = document.querySelector('.amountValue');
  const balanceValue = document.querySelector('.balanceValue');
  // end

  const errors = document.querySelector('#error-list');
  const loader = document.querySelector('.loader');
  const wait = document.querySelector('.wait');
  const errorMessage = document.querySelector('#errorMessage');
  const successMessage = document.querySelector('#successMessage');

  const transaction = {
    amount,
  };

  const init = {
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };

  const validTransaction = () => {
    let errorCount = 0;

    if (transactType === '') {
      transactTypeInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      transactTypeInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (accountNumber === '') {
      accountNumberInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      accountNumberInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }

    if (amount === '') {
      amountInput.style.border = '1px solid rgba(255, 0, 0, .6)';
      errorCount += 1;
    } else {
      amountInput.style.border = '1px solid rgba(0, 255, 255, .5)';
    }
    if (errorCount === 0) {
      return true;
    } return false;
  };

  if (validTransaction()) {
    accountNumberInfo.style.display = 'none';
    transactionType.style.display = 'none';
    amountDiv.style.display = 'none';
    balance.style.display = 'none';

    modal.style.display = 'block';
    loader.style.display = 'block';
    wait.style.display = 'block';

    fetch(`${url}/api/v1/transactions/${accountNumber}/${transactType}`, init)
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
          const transactionInfo = data.data[0];
          successMessage.innerHTML = 'Transaction Successful <i class="fas fa-check-circle"></i>';
          accountNumberValue.textContent = transactionInfo.accountNumber;
          transactionTypeValue.textContent = transactionInfo.transactionType;
          amountValue.textContent = transactionInfo.amount;
          balanceValue.textContent = transactionInfo.accountBalance;

          accountNumberInfo.style.display = 'block';
          successMessage.style.display = 'block';

          transactionType.style.display = 'block';
          amountDiv.style.display = 'block';
          balance.style.display = 'block';

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
  }

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      errors.textContent = '';
      errorMessage.textContent = '';
      successMessage.textContent = '';
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
    }
  };
};

transactForm.addEventListener('submit', transact);
