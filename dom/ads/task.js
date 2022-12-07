class Rotator {
  constructor(containerClass) {
    this.rotatorsList = document.querySelector(`.${containerClass}`).querySelectorAll('.rotator');
    
    this.init();
  }

  init() {
    this.rotatorsStorage = [];

    for (let i = 0; i < this.rotatorsList.length; i++) {
      const caseList = this.rotatorsList[i].querySelectorAll('.rotator__case');

      this.rotatorsStorage[i] = { caseList };
      this.rotatorsStorage[i].activeCaseIndex = this.getActiveCaseIndex(caseList);
      this.rotatorsStorage[i].isWorking = false;
    }
    
  }

  getActiveCaseIndex(caseList) {
    for (let i = 0; i < caseList.length; i++) {
      if (caseList[i].classList.contains('rotator__case_active')) {
        return i;
      }
    }
  }

  start() {
    for (let i = 0; i < this.rotatorsStorage.length; i++) {
      this.startTimer(this.rotatorsStorage[i]);
    }
  }

  startTimer(rotator) {
    if (rotator.isWorking) {
      this.changeActiveCase(rotator);
    } else {
      rotator.isWorking = true;
    }

    const activeElement = rotator.caseList[rotator.activeCaseIndex];

    this.setElementColor(activeElement, this.getColor(activeElement));    
    setTimeout(this.startTimer.bind(this), this.getDelay(activeElement), rotator);    
  }  

  changeActiveCase(rotator) {
    rotator.caseList[rotator.activeCaseIndex].classList.remove('rotator__case_active');
    this.setNextElementIndex(rotator);
    rotator.caseList[rotator.activeCaseIndex].classList.add('rotator__case_active');
  }

  setElementColor(element, color) {
    element.style.color = color;    
  }

  setNextElementIndex(rotator) {
    if (++rotator.activeCaseIndex >= rotator.caseList.length) {
      rotator.activeCaseIndex = 0;
    }
  }

  getDelay(element) {
    return +element.dataset.speed;
  }

  getColor(element) {
    return element.dataset.color;
  }
}

const rotator = new Rotator('card');
rotator.start();