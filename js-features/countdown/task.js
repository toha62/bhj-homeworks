class CountdownTimer {  
  constructor(timerId) {
    this.element = document.getElementById(timerId);
    this.timerValue = this.element.innerText;
  }  

  timerId = null;

  startTimer() {
    if (this.isTimerValueValid()) {      
      this.renderTimerValue(this.timerValue--);
      this.timerId = setInterval(() => {
        if (this.timerValue === 0) {    
          clearInterval(this.timerId);
          alert('Вы победили в конкурсе!');
        }
        this.renderTimerValue(this.timerValue--);
      }, 1000);
    }
  }

  isTimerValueValid() {
    if (this.timerValue <= 0) {
      alert('Значение таймера должно быть больше нуля');
      return false;
    }
    return true;
  }

  renderTimerValue(value) {
    this.element.innerText = this.getHMSFromSeconds(value);
  }

  getHMSFromSeconds(rawSeconds) {  
    let seconds = rawSeconds % 60;
    let minutes = (rawSeconds - seconds) % 3600 / 60;
    let hours = (rawSeconds - seconds - minutes * 60) / 3600;
  
    seconds = (seconds < 10 ? '0' : '') + seconds;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    hours = (hours < 10 ? '0' : '') + hours;
  
    return `${hours}:${minutes}:${seconds}`;
  }
}

// для красоты, со значением 400рх значение таймера не умещается, происходит перенос
document.querySelector('.card').style.width = '405px';

const countdownTimer = new CountdownTimer('timer');
countdownTimer.startTimer();