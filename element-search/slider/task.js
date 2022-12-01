class Slider {
  constructor(startIndex, timeInterval) {
    this.itemsList = document.querySelectorAll('.slider__item');
    this.dotsList = document.querySelectorAll('.slider__dot');    
    this.activeItemIndex = startIndex;
    this.totalItem = this.itemsList.length;
    this.timeInterval = timeInterval;
    this.eventClick = new Event('click', {bubbles: true});
    this.intervalId = null;
    this.isSliding = false;

    this.showItem(this.activeItemIndex);
    this.activateDot(this.activeItemIndex);
    document.querySelector('.slider__navigation').addEventListener('click', this.clickAction.bind(this));
  }

  clickAction(event) {
    if (this.intervalId) {
      clearInterval(this.intervalId);      
    }
    this.cleanSlider(this.activeItemIndex);
    
    if (event.target.classList.contains('slider__arrow_next')) {
      this.nextAction();
    }
    if (event.target.classList.contains('slider__arrow_prev')) {
      this.previousAction();
    } 
    if (event.target.classList.contains('slider__dot')) {
      this.dotAction(event.target);
    }
    this.renderSlider(this.activeItemIndex);

    if (this.isSliding) {
      this.start();
    }
  }

  nextAction() {       
    if (++this.activeItemIndex >= this.totalItem) {
      this.activeItemIndex = 0;
    }      
  }

  previousAction() {    
    if (--this.activeItemIndex < 0) {
      this.activeItemIndex = this.totalItem - 1;
    }       
  }

  dotAction(clickedElement) {       
    this.activeItemIndex = this.getIndexDotElement(clickedElement);        
  }

  cleanSlider(itemIndex) {
    this.hideItem(itemIndex);
    this.deactivateDot(itemIndex);
  }

  renderSlider(itemIndex) {
    this.showItem(itemIndex);
    this.activateDot(itemIndex);
  }

  hideItem(itemIndex) {
    this.itemsList[itemIndex].classList.remove('slider__item_active');
  }

  showItem(itemIndex) {    
    this.itemsList[itemIndex].classList.add('slider__item_active');
  }

  deactivateDot(dotIndex) {
    this.dotsList[dotIndex].classList.remove('slider__dot_active');
  }

  activateDot(dotIndex) {
    this.dotsList[dotIndex].classList.add('slider__dot_active');
  }

  getIndexDotElement(clickedElement) {
    for (let i = 0; i < this.dotsList.length; i++) {
      if (this.dotsList.item(i) === clickedElement) {
        return i;
      }      
    }
  }

  start() {
    this.isSliding = true;
    this.intervalId = setInterval(() => {      
      document.querySelector('.slider__arrow_next').dispatchEvent(this.eventClick);
    }, this.timeInterval);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isSliding = false;
    this.intervalId = null;
  }
}

const slider = new Slider(0, 3000); 
slider.start();