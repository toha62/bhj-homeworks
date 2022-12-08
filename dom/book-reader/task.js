class BooksReader {
  constructor(bookId) {
    const controlsElement = document.getElementById(bookId).querySelector('.book__controls');
    const contentElement = document.getElementById(bookId).querySelector('.book__content');
    controlsElement.onselectstart = () => false;

    // this.tabList = tabsElement.querySelectorAll('.tab');
    // this.tabContentList = tabsElement.querySelectorAll('.tab__content');
    // this.activeTab = tabsElement.querySelector('.tab_active');
    // this.activeTabIndex = this.findTabIndex(this.activeTab);
    
    this.setEventListener(controlsElement);

    // controlsElement.querySelector('.book__control_font-size').addEventListener('click', this.clickOnControlsAction.bind(this));
    // controlsElement.querySelector('.book__control_color').addEventListener('click', this.clickOnControlsAction.bind(this));
    // controlsElement.querySelector('.book__control_background').addEventListener('click', this.clickOnControlsAction.bind(this));
  }

  setEventListener(container) {
    const elementsList = container.querySelectorAll('.book__control');

    for (let i = 0; i < elementsList.length; i++) {      
      elementsList[i].addEventListener('click', this.clickOnControlsAction.bind(this));
    }
  }

  clickOnControlsAction(event) {    
    event.preventDefault();

    const container = event.currentTarget;   
    const activeControlElemen = this.getActiveControlElement(container.querySelectorAll('a'))

    if (event.target !== activeControlElemen && event.target.tagName === 'A') {
      let activeClass;
      const controlType = this.getControlType(container);
      console.log(controlType, event.currentTarget, event);

      switch (controlType) {
        case 'font-size':
          activeClass = 'font-size_active';
          break;
        case 'color':
          activeClass = 'color_active';          
          break;
        case 'background':
          activeClass = 'color_active';
          break;
      }

      this.removeActiveControlFromElement(activeControlElemen, activeClass);
      this.setActiveControlOnElement(event.target, activeClass);
    }     

    // console.log(event.target.closest('.book__control').querySelectorAll('a'));
    // console.log(this.getActiveControlElement(event.target.closest('.book__control').querySelectorAll('a')));
    
  }

  getControlType(element) {
    const classString = element.classList.value;

    return classString.slice(classString.indexOf('book__control_') + 'book__control_'.length);
  }

  getActiveControlElement(elementsList) {
    for (let i = 0; i < elementsList.length; i++) {
      if (this.isElementHaveActiveClass(elementsList[i])) {
        return elementsList[i];
      }      
    }
    return null;
  }

  isElementHaveActiveClass(element) {
    for (let i = 0; i < element.classList.length; i++) {
      if (element.classList[i].includes('active')) {
        return true;
      }
    }
    return false;
  }

  setActiveControlOnElement(element, activeClass) {
    element.classList.add(activeClass);
  }

  removeActiveControlFromElement(element, activeClass) {
    element.classList.remove(activeClass);
  }

}

const b = new BooksReader('book');