class Checkbox {
  constructor(checkboxContainer) {
    const container = document.querySelector(`.${checkboxContainer}`);

    this.checkboxList = container.querySelector('ul');

    this.checkboxList.addEventListener('change', this.clickAction.bind(this));

    // console.log(this.checkboxList, this.checkboxList.children);
    this.checkboxStructure = [];
    // this.init();
  }

  clickAction(event) {    
    const childElementList = event.target.closest('li').querySelector('ul');
    const currentElementsList = event.target.closest('ul').children;
    const parentElement =  event.target.closest('ul').parentElement;

    this.doCheck(childElementList, event.target.checked);

    if (parentElement.tagName != 'LI') {
      return;
    }
    
    console.log('continue');

    let isChecked = true;
    let isUnChecked = true;

    for (let element of currentElementsList) {
      const input = element.querySelector('input');
      // console.log(input);
      isChecked = isChecked && input.checked;
      isUnChecked = isUnChecked && !input.checked;
    }
    console.log(isChecked, isUnChecked); 

    parentElement.querySelector('input').indeterminate = false;
    
    if (isChecked) {
      parentElement.querySelector('input').checked = true;
    }

    if (isUnChecked) {
      parentElement.querySelector('input').checked = false;
    }

    if (!(isChecked || isUnChecked)) {
      parentElement.querySelector('input').indeterminate = true;
    }
  }

  doCheck(checkboxList, isChecked) {
    if (checkboxList) {
      for (let element of checkboxList.children) {        
        element.querySelector('input').checked = isChecked;
        this.doCheck(element.querySelector('ul'), isChecked);
      }
    }
  }

  init() {
    for (element of this.checkboxList) {

    }
  }
}

new Checkbox('card');