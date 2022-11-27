class CookieClicker {
  constructor(imgId, clickerCounterId, clickerSpeedId, buttonNewId, buttonEndId) {
    this.imgElement = document.getElementById(imgId);
    this.clickerCounterElement = document.getElementById(clickerCounterId);
    this.clickerSpeedElement = document.getElementById(clickerSpeedId);
    this.buttonNewElement = document.getElementById(buttonNewId);
    this.buttonEndElement = document.getElementById(buttonEndId);
    this.cardElement = document.querySelector('.card');
    this.resetGameData();
  }

  resetGameData() {
    this.imgElement.onclick = null;
    this.buttonNewElement.onclick = this.startGame.bind(this);
    this.buttonEndElement.onclick = null;
    this.clickerCounterElement.innerText = 0;
    this.clickerSpeedElement.innerText = 0;    
  }

  startGame() {
    this.cardElement.style.display = 'block';
    this.imgElement.onclick = this.onClickReaction.bind(this);
    this.buttonNewElement.onclick = this.restartGame.bind(this);
    this.buttonEndElement.onclick = this.endGame.bind(this);
    this.previousClickTime = null;
    this.maxClickSpeed = 0;
  }  

  restartGame() {
    if (confirm('Вы уверены, что хотите начать новую игру ?')) {
      this.resetGameData();
      this.startGame();
    }
  }

  endGame() {
    if (confirm('Вы уверены, что хотите завершить игру ?')) {      
      alert(`Вы сделали: ${this.clickerCounterElement.innerText} кликов. 
            Ваша максимальная скорость: ${this.maxClickSpeed}`);
      this.cardElement.style.display = 'none';
      this.resetGameData();
    }    
  }

  onClickReaction() {    
    this.calculateClickerSpeedAndMax();
    this.changeSizeImg();
    this.increaseClickerCounter();
  }

  calculateClickerSpeedAndMax() {
    let clickSpeed;
    this.curentClickTime = new Date;
    if (this.previousClickTime) {
      clickSpeed = (1000 / (this.curentClickTime - this.previousClickTime)).toFixed(2);
      this.clickerSpeedElement.innerText = clickSpeed;
      if (clickSpeed > this.maxClickSpeed) {
        this.maxClickSpeed = clickSpeed;
      }
    }    
    this.previousClickTime = this.curentClickTime;
  }

  changeSizeImg() {
    this.imgElement.width = this.imgElement.width == '200' ? 250 : 200;    
  }

  increaseClickerCounter() {
    this.clickerCounterElement.innerText = +this.clickerCounterElement.innerText + 1;
  }

  
}

const cookieClicker = new CookieClicker('cookie', 'clicker__counter', 'clicker__speed', 'button-new', 'button-end');