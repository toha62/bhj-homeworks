class BooksReader {
  constructor(bookId) {
    this.mainContainer = document.getElementById(bookId);
    const controlsElement = this.mainContainer.querySelector('.book__controls');
    this.controlsData = {
      'control_font-size': {
        activeClass: 'font-size_active',
        dataset: 'size',
        prefix: 'book_fs-',
      },
      'control_color': {
        activeClass: 'color_active',
        dataset: 'textColor',
        prefix: 'book_color-',
      },
      'control_background': {
        activeClass: 'color_active',
        dataset: 'bgColor',
        prefix: 'book_bg-',
      },
    }

    controlsElement.onselectstart = () => false;                  
    this.setEventListener(controlsElement);    
  }

  setEventListener(container) {
    const elementsList = container.querySelectorAll('.book__control');

    for (let i = 0; i < elementsList.length; i++) {      
      elementsList[i].addEventListener('click', this.clickOnControlsAction.bind(this));
    }
  }

  clickOnControlsAction(event) {      
    const targetElement = event.target;
    this.currentActiveContainer = event.currentTarget; 

    event.preventDefault();
      
    this.currentActiveControlElement = this.getActiveControlElement(this.currentActiveContainer.querySelectorAll('a'));

    if (targetElement !== this.currentActiveControlElement && targetElement.tagName === 'A') {
      const classModificator=this.getActiveControlElementClassModificator();

      this.toggleActiveControlElement(targetElement, this.controlsData[classModificator].activeClass);       
      this.resetStyleModificator(classModificator);
      this.setStyleModificator(classModificator);           
    } 
  }

  getActiveControlElement(elementsList) {
    return [...elementsList].find(item => this.isElementHaveActiveClass(item));    
  }

  isElementHaveActiveClass(element) {
    return [...element.classList].find(item => item.includes('active'));    
  }

  getActiveControlElementClassModificator() {
    let startIndex = this.currentActiveContainer.className.indexOf('control_');

    return this.currentActiveContainer.className.slice(startIndex);
  }

  toggleActiveControlElement(targetElement, activeClass) {
    this.removeActiveControlFromElement(this.currentActiveControlElement, activeClass);
    this.currentActiveControlElement = targetElement;
    this.setActiveControlOnElement(this.currentActiveControlElement, activeClass);
  }

  setActiveControlOnElement(element, activeClass) {
    element.classList.add(activeClass);
  }

  removeActiveControlFromElement(element, activeClass) {
    element.classList.remove(activeClass);
  } 

  setStyleModificator(classModificator) {
    const datasetPostfix = this.controlsData[classModificator].dataset;
    const datasetPrefix = this.controlsData[classModificator].prefix;

    if (this.currentActiveControlElement.dataset[datasetPostfix]) {
      this.mainContainer.classList.add(datasetPrefix + this.currentActiveControlElement.dataset[datasetPostfix]);
    }
  }

  resetStyleModificator(classModificator) {
    const classNameString = this.mainContainer.className;
    const datasetPrefix = this.controlsData[classModificator].prefix;

    let startIndex = classNameString.indexOf(datasetPrefix);

    if (startIndex === -1) {
      return;
    }

    let removingClass;    
    let endIndex = classNameString.indexOf(' ', startIndex);

    if (endIndex === -1) {
      removingClass = classNameString.slice(startIndex);
    } else {
      removingClass = classNameString.slice(startIndex, endIndex);
    }
    
    this.mainContainer.classList.remove(removingClass);
  }
}

new BooksReader('book');