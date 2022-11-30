const menu = document.querySelector('.menu_main');
let shownSubMenuElement = null;

menu.addEventListener('click', clickAction);

function clickAction(event) {
  let subMenuElement;
  if (!(subMenuElement = getSubMenu(event.target))) {    
    hideSubMenu(shownSubMenuElement);  
    return;  
  } 

  event.preventDefault();    

  if (shownSubMenuElement !== subMenuElement) {    
    hideSubMenu(shownSubMenuElement);    
    shownSubMenuElement = subMenuElement;
    showSubMenu(subMenuElement);    
  } else {
    hideSubMenu(subMenuElement);
    shownSubMenuElement = null;
  }     
}

function getSubMenu(element) {
  return element.closest('.menu__item').querySelector('.menu_sub');
}

function showSubMenu(subMenuElement) { 
  subMenuElement.classList.add('menu_active');   
}

function hideSubMenu(subMenuElement) {
  if (subMenuElement) {
    subMenuElement.classList.remove('menu_active');
  }
}