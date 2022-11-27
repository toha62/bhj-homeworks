class MoleGame {
  constructor() {
    this.deadMoleCounterField = document.getElementById('dead');
    this.lostCounterField = document.getElementById('lost');
    this.resetGame();
    this.holeFieldElement = document.querySelector('.hole-game');
    this.holeFieldElement.addEventListener('click', this.clickAction.bind(this));
  }

  resetGame() {
    this.deadMoleCounter = 0;
    this.lostCounter = 0;
    this.renderDeadMoleCounter(0);
    this.renderLostCounter(0);
  }

  clickAction(event) {
    if (this.isHitMole(event)) {
      this.renderDeadMoleCounter(++this.deadMoleCounter);
    } else {
      this.renderLostCounter(++this.lostCounter);
    }

    if (this.isWinGame()) {
      alert('Вы попедили !!!');
      this.resetGame();
    }

    if (this.isLostGame()) {
      alert('Вы проиграли ((');
      this.resetGame();
    }
  }

  isHitMole(event) {
    return event.target.classList.contains('hole_has-mole');
  }

  renderDeadMoleCounter(counter) {
    this.deadMoleCounterField.innerText = counter;
  }

  renderLostCounter(counter) {
    this.lostCounterField.innerText = counter;
  }

  isWinGame() {
    return this.deadMoleCounter === 10;
  }

  isLostGame() {
    return this.lostCounter === 5;
  }
}

const moleGame = new MoleGame();