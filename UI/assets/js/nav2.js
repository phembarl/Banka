var items = document.querySelectorAll('.nav-items');
var toggler = document.querySelector('.tog-btn');

function classToggle(){
	for(var i = 0; i < items.length; i++){
		items[i].classList.toggle('toggle-show');
	}
}

toggler.addEventListener('click', classToggle);
