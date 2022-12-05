class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');
    this.intervalId = null;
        
    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();    
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    
    this.resetTimer();
  }

  registerEvents() {    
    document.addEventListener('keydown', this.keyPressAction.bind(this));
  }

  keyPressAction(event) {    
    const pressedKey = event.key.toLowerCase();

    if (!(event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)) {      
      if (this.currentSymbol.textContent.toLowerCase() === pressedKey) {
        this.success();
      } else {
        this.fail();
      }
    }    
  }

  resetTimer() {
    this.timerElement.textContent = this.wordLength;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(this.timerAction.bind(this), 1000);
  }

  timerAction() {    
    if (--this.timerElement.textContent === 0) {      
      alert('Вы проиграли!');      
      this.reset();
    }
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 2) {      
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    this.resetTimer();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {      
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
    this.resetTimer();
  }

  setNewWord() {
    const word = this.getWord();

    this.wordLength = word.length;

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

const game = new Game(document.getElementById('game'));

