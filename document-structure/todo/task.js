class ToDo {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.input = this.container.querySelector('.tasks__input');
    this.button = this.container.querySelector('.tasks__add');
    this.taskList = this.container.querySelector('.tasks__list');

    this.registerEvents();
  }

  registerEvents() {
    this.button.addEventListener('click', event => {
      event.preventDefault();      
      this.insertListItem();
    });

    this.input.addEventListener('keydown', event => {
      const { key } = event;

      if (key === 'Enter') {
        this.insertListItem();
      }
    });
  }

  insertListItem() {
    const text = this.input.value;

    if (text) {
      this.input.value = '';

      this.taskList.insertAdjacentHTML('beforeend', `
      <div class="task">
        <div class="task__title">
          ${text}
        </div>
        <a href="#" class="task__remove">&times;</a>
      </div>
      `);

      this.registerEventListenerOnRemove();
    }
  }

  registerEventListenerOnRemove() {
    const taskRemove = this.taskList.lastElementChild.querySelector('.task__remove');

    taskRemove.addEventListener('click', event => {
      event.preventDefault();      
      event.target.parentElement.remove();
    });
  }

} 

new ToDo('.tasks');