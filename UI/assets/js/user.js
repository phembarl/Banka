const del = document.querySelector('.delete');
const account = document.querySelector('.info');
const activate = document.querySelector('.activate');
const deactivate = document.querySelector('.deactivate');
const status = document.querySelector('#status');

del.addEventListener('click', () => {
    if (confirm('Warning!!! Are you sure you want to delete this account?')){
        account.style.display = 'none';
        alert('You have deleted this account!');
    }
});

activate.addEventListener('click', () => {
    status.textContent = 'active';
    alert('You have activated this account!');
});

deactivate.addEventListener('click', () => {
    status.textContent = 'dormant';
    alert('You have deactivated this account!');
});


