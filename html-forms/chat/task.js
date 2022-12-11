class WidgetChat {
  constructor(widgetClass) {
    const chatWidget = document.querySelector(`.${widgetClass}`);
    this.container = chatWidget.querySelector('.chat-widget__messages-container');
    this.input = chatWidget.querySelector('.chat-widget__input');
    this.messages = chatWidget.querySelector('.chat-widget__messages');
    this.messageText = '';
    this.timerId = null;
    this.timeout = 10000;
    this.robotMessages = [
      'Привет и пока',
      'Соскучились?',
      'Кто тут?',
      'К сожалению, все операторы сейчас заняты. До свидания.',
      'Приходите завтра',
      'Утро вечера мудреннее',
      'Работа не волк ...',
      'Час от часу не легче',
    ];

    chatWidget.addEventListener('click', this.showWidget.bind(this));
    this.input.addEventListener('focus', this.startTimer.bind(this)); 
    this.input.addEventListener('blur', this.stopTimer.bind(this));  
    this.input.addEventListener('input', this.resetTimer.bind(this)); 
    this.input.addEventListener('keydown', this.sendMessage.bind(this)); 
  }

  showWidget(event) {    
    event.currentTarget.classList.add('chat-widget_active');
  }

  startTimer() {
    this.timerId = setTimeout(() => {
      this.messageText = 'О, где же ты, брат?';
      this.isClient = false;
      this.renderMessage();
      this.startTimer();
    }, this.timeout);    
  }

  stopTimer() {
    clearTimeout(this.timerId);    
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();    
  }

  sendMessage(event) {    
    this.messageText = this.input.value;

    if (event.key === 'Enter' && this.messageText) {    
      this.isClient = true;  
      this.renderMessage();
      this.clearInput();
      this.messageText = this.getRandomMessage();
      this.isClient = false;
      this.renderMessage();         
    }       
  }

  renderMessage() {
    this.writeHTMLAndTimeStamp();
    this.scrollToBottom();    
  }
  
  writeHTMLAndTimeStamp() { 
    const currentTime = this.getCurrentTime();   
    let clientClass = this.isClient ? ' message_client' : '';

    this.messages.innerHTML += `
      <div class="message${clientClass}">
        <div class="message__time">${currentTime}</div>
        <div class="message__text">${this.messageText}</div>
      </div>
    `;
  }

  clearInput() {
    this.input.value = '';
  } 

  getRandomMessage() {
    const messageIndex =  Math.floor(this.robotMessages.length * Math.random());
    
    return this.robotMessages[messageIndex];
  }

  scrollToBottom() {
    if (this.container.scrollHeight > this.container.clientHeight) {
      this.container.scrollTop = this.container.scrollHeight - this.container.clientHeight;      
    }           
  }

  getCurrentTime() {
    const date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    minutes = (minutes < 10 ? '0' : '') + minutes;
    hours = (hours < 10 ? '0' : '') + hours;

    return `${hours}:${minutes}`;
  }  
}

new WidgetChat('chat-widget');