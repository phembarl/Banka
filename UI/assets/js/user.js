const del = document.querySelector('.delete');
const activate = document.querySelector('.activate');
const deactivate = document.querySelector('.deactivate');
const status = document.querySelector('#status');
const deleteMessage = document.querySelector('.message');
const deleteModal = document.querySelector('.delete-modal');
const activateModal = document.querySelector('.activate-modal');
const deactivateModal = document.querySelector('.deactivate-modal');
const ok = document.querySelector('.ok');
const cancel = document.querySelector('.cancel');
const credit = document.querySelector('.credit');
const debit = document.querySelector('.debit');
const creditModal = document.querySelector('.credit-modal');
const debitModal = document.querySelector('.debit-modal');

del.addEventListener('click', () => {
  deleteModal.style.display = 'block';
});

ok.addEventListener('click', () => {
  deleteModal.style.display = 'none';
  deleteMessage.style.display = 'block';
});

cancel.addEventListener('click', () => {
  deleteModal.style.display = 'none';
});

activate.addEventListener('click', () => {
  activateModal.style.display = 'block';
  status.textContent = 'active';
});

deactivate.addEventListener('click', () => {
  deactivateModal.style.display = 'block';
  status.textContent = 'dormant';
});

credit.addEventListener('click', () => {
  creditModal.style.display = 'block';
});

debit.addEventListener('click', () => {
  debitModal.style.display = 'block';
});

window.onclick = (event) => {
  if (event.target === deleteModal || event.target === activateModal
        || event.target === deactivateModal || event.target === creditModal
        || event.target === debitModal) {
    activateModal.style.display = 'none';
    deleteModal.style.display = 'none';
    deactivateModal.style.display = 'none';
    creditModal.style.display = 'none';
    debitModal.style.display = 'none';
  }
}
