class CookieClicker {
  constructor(imgId, clickerCounterId, clickerSpeedId) {
    this.imgElement = document.getElementById(imgId);
    this.clickerCounterElement = document.getElementById(clickerCounterId);
    this.clickerSpeedElement = document.getElementById(clickerSpeedId);
    this.imgElement.onclick = this.onClickReaction.bind(this);
    this.previousClickTime = null;
  }

  onClickReaction() {    
    this.calculateClickerSpeed();
    this.changeSizeImg();
    this.increaseClickerCounter();
  }

  changeSizeImg() {
    this.imgElement.width = this.imgElement.width == '200' ? 250 : 200;    
  }

  increaseClickerCounter() {
    this.clickerCounterElement.innerText = +this.clickerCounterElement.innerText + 1;
  }

  calculateClickerSpeed() {
    this.curentClickTime = new Date;
    if (this.previousClickTime) {
      this.clickerSpeedElement.innerText = (1000 / (this.curentClickTime - this.previousClickTime)).toFixed(2);      
    }    
    this.previousClickTime = this.curentClickTime;
  }

}

const cookieClicker = new CookieClicker('cookie', 'clicker__counter', 'clicker__speed');