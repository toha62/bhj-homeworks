const closeWindowElements = document.querySelectorAll('.modal__close');
const showWindowElements = document.querySelectorAll('.show-success');

for (element of closeWindowElements) {
  element.addEventListener('click', closeWindow);  
}

for (element of showWindowElements) {
  element.addEventListener('click', showWindow);  
}

showWindowById('modal_main');

function closeWindow(event) {  
  event.target.closest('.modal').classList.remove('modal_active');
}

function showWindow() {  
  showWindowById('modal_success');  
}

function showWindowById(elementId) {  
  document.getElementById(elementId).classList.add('modal_active');  
} 