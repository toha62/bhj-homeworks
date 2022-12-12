class Checkbox {
  constructor(checkboxContainer) {
    const checkbox = document.querySelector(`.${checkboxContainer}`).querySelector('ul');    

    checkbox.addEventListener('change', this.clickAction.bind(this));    
  }

  clickAction(event) {    
    const childList = event.target.closest('li').querySelector('ul');    
    const currentList = event.target.closest('ul');    

    this.doCheckInside(childList, event.target.checked);
    this.doCheckOutside(currentList);
  }

  doCheckInside(checkboxList, isChecked) {
    if (checkboxList) {
      for (let element of checkboxList.children) {        
        element.querySelector('input').checked = isChecked;
        element.querySelector('input').indeterminate = false;
        this.doCheckInside(element.querySelector('ul'), isChecked);
      }
    }
  }

  doCheckOutside(elementList) {
    let parentElement = elementList.parentElement;
    
    if (parentElement.tagName === 'LI') {
      let currentLevelCheckBoxList = elementList.children;
      let isChecked = true;
      let isUnChecked = true;
      let isIdeterminate = false;
      
      for (let element of currentLevelCheckBoxList) {
        const input = element.querySelector('input');        
        
        isChecked = isChecked && input.checked;
        isUnChecked = isUnChecked && !input.checked;
        isIdeterminate = isIdeterminate || input.indeterminate;
      }
      
      parentElement.querySelector('input').indeterminate = false;
      
      if (isChecked) {
        parentElement.querySelector('input').checked = true;        
      }

      if (isUnChecked) {
        parentElement.querySelector('input').checked = false;        
      }

      if (!(isChecked || isUnChecked) || isIdeterminate) {
        parentElement.querySelector('input').indeterminate = true;        
      }

      this.doCheckOutside(parentElement.closest('ul'));
    }
    
  }
  
}

new Checkbox('card');