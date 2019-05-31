// reference: https://codepen.io/ok2ju/pen/MwyvWY

const options = document.querySelector('.options');
const menuCon = document.querySelector('.menu-container');
const imageIcon = document.querySelector('.pishicon');
const caret = document.querySelector('.caret');

options.addEventListener('click', () => {
  menuCon.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  if (event.target !== imageIcon && event.target !== caret) {
    menuCon.classList.remove('active');
  }
});
