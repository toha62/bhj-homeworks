class DropdownMenu {
  constructor(menuContainer) {
    document.querySelector(`.${menuContainer}`).addEventListener('click', this.clickAction.bind(this));
  }
  

  clickAction(event) {
    this.activeMenu = event.target.closest('.dropdown');
    this.activeMenu.onselectstart = () => false;
    if (event.target.classList.contains('dropdown__value')) {
     this.toggleMenu();
    }
    if (event.target.classList.contains('dropdown__link')) {
      event.preventDefault();
      this.selectMenuItem(event.target);
     }
  }

  toggleMenu() {   
    const menuList = this.activeMenu.querySelector('.dropdown__list');
    if (menuList.classList.contains('dropdown__list_active')) {
      menuList.classList.remove('dropdown__list_active');
    } else {
      menuList.classList.add('dropdown__list_active');
    }
  }

  selectMenuItem(selectedItem) {
    this.activeMenu.querySelector('.dropdown__value').innerText = selectedItem.innerText;
    this.toggleMenu();   
  }
}

const menu = new DropdownMenu('card');