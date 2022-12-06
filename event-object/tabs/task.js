class Tabs {
  constructor(tabsId) {
    const tabsElement = document.getElementById(tabsId);

    tabsElement.querySelector('.tab__navigation').onselectstart = () => false;

    this.tabList = tabsElement.querySelectorAll('.tab');
    this.tabContentList = tabsElement.querySelectorAll('.tab__content');
    this.activeTab = tabsElement.querySelector('.tab_active');
    this.activeTabIndex = this.findTabIndex(this.activeTab);
    
    tabsElement.querySelector('.tab__navigation').addEventListener('click', this.clickOnTabAction.bind(this));
  }

  clickOnTabAction(event) {
    const clickedTabElement = event.target;

    if (this.isClickOnTab(clickedTabElement) && this.isActiveTabChange(clickedTabElement)) {      
      this.toggleActiveTab(clickedTabElement); 
      this.toggleTabContentByIndex(this.findTabIndex(clickedTabElement));        
    }    
  }

  isClickOnTab(clickedElement) {
    return clickedElement.classList.contains('tab');
  }

  isActiveTabChange(tabElement) {
    return !tabElement.classList.contains('tab_active');
  }
  
  toggleActiveTab(tabElement) {    
    this.activeTab.classList.remove('tab_active');
    this.activeTab = tabElement;
    this.activeTab.classList.add('tab_active');      
  }

  findTabIndex(tabElement) {
    for (let i = 0; i < this.tabList.length; i++) {
      if (this.tabList.item(i) === tabElement) {
        return i;
      }      
    }
  }

  toggleTabContentByIndex(tabIndex) {
    this.tabContentList[this.activeTabIndex].classList.remove('tab__content_active');    
    this.activeTabIndex = tabIndex; 
    this.tabContentList[this.activeTabIndex].classList.add('tab__content_active');    
  }
}

new Tabs('tabs1');