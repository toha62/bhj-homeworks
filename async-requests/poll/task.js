class Poll {
  constructor() {
    this.pollTitle = document.getElementById('poll__title');
    this.pollAnswers = document.getElementById('poll__answers');
    this.pollResults = document.getElementById('poll__results');
    
    this.createGETRequest();
    this.registerEvents();
  }

  createGETRequest() {    
    this.xhr = new XMLHttpRequest();

    this.xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
    this.xhr.responseType = 'json';
    this.xhr.send();
  }

  registerEvents() {
    this.xhr.addEventListener('load', () => this.processingRequest());

    this.pollAnswers.addEventListener('click', event => this.onClickAction(event));
  }

  processingRequest() {
    console.log('request loaded');

    if (this.xhr.status != 200) {       
      alert( 'Ошибка: ' + this.xhr.status);
      return;
    }

    this.responseObject = this.xhr.response;
    
    this.renderPoll();
  }

  renderPoll() {
    this.renderPollTitle();
    this.renderPollAnswers();
  }

  renderPollTitle() {
    this.pollTitle.innerText = this.responseObject.data.title;
  }

  renderPollAnswers() {
    const answers = this.responseObject.data.answers;
    const html = answers.map(answer => `
      <button class="poll__answer">
        ${answer}
      </button>
    `);

    this.pollAnswers.innerHTML = html.join('');
  }

  onClickAction(event) {
    const { target } = event;

    if (!target.matches('.poll__answer')) {
      return;
    }

    this.pollId = this.responseObject.id;
    this.answerIndex = this.responseObject.data.answers.indexOf(target.innerText);
        
    alert('Спасибо, ваш голос засчитан!');

    this.hideAnswers();
    this.createPOSTRequest();
  }

  hideAnswers() {
    this.pollAnswers.classList.remove('poll__answers_active');
  }

  createPOSTRequest() {
    this.xhrPOST = new XMLHttpRequest();

    this.xhrPOST.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    this.xhrPOST.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    this.xhrPOST.responseType = 'json';
    this.xhrPOST.send(`vote=${this.pollId}&answer=${this.answerIndex}`);

    this.xhrPOST.addEventListener('load', () => {  
      this.statArray = this.xhrPOST.response.stat;     

      this.renderPollResults();
      this.showPollResults();
    });
  }

  renderPollResults() {    
    const totalVotes = this.statArray.reduce((sum, item) => sum + +item.votes, 0);
    const html = this.statArray.map(item => `
      <div>
        ${item.answer}: <b>${(item.votes / totalVotes * 100).toFixed(2)}%</b>
      </div>
    `);

    this.pollResults.innerHTML = html.join('');
  }

  showPollResults() {
    this.pollResults.classList.add('poll__results_active');
  }
}

new Poll();