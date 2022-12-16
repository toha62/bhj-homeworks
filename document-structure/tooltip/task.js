class Tooltip {
  constructor() {
    this.hasTooltipElementsList = document.querySelectorAll('.has-tooltip');
    this.activeTooltip = null;

    this.injectTooltipHTML();
    this.registerEvents();
  }

  injectTooltipHTML() {
    Array.from(this.hasTooltipElementsList).map(element => {      
      element.insertAdjacentHTML('afterEnd', `
        <div class="tooltip" style="left: 0; top: 0">
          ${element.title}
        </div>
      `);      
    });
  }

  registerEvents() {
    Array.from(this.hasTooltipElementsList).map(element => element.addEventListener('click', event => {
      const { target } = event;
      event.preventDefault();

      this.toggleActiveTooltip(target);      
      this.renderTooltip();
    }));

    document.addEventListener('scroll', () => {
      if (this.activeTooltip){
        this.renderTooltip();
      }      
    });
  }

  toggleActiveTooltip(target) {
    if (this.activeTooltip) {
      this.activeTooltip.classList.remove('tooltip_active');
    }  
    this.activeTooltip = target.nextElementSibling;
    this.activeTooltip.classList.add('tooltip_active');
  }

  renderTooltip() {
    const coordsOfElement = this.activeTooltip.previousElementSibling.getBoundingClientRect();
    const coordsOfTooltip = this.activeTooltip.getBoundingClientRect();
    const { position } = this.activeTooltip.previousElementSibling.dataset;

    switch (position) {
      case 'top':
        this.activeTooltip.style.top = coordsOfElement.top - coordsOfTooltip.height + 'px';
        this.activeTooltip.style.left = coordsOfElement.left + 'px';
        break;

        case 'bottom':
          this.activeTooltip.style.top = coordsOfElement.top + coordsOfElement.height + 'px';
          this.activeTooltip.style.left = coordsOfElement.left + 'px';
          break;

        case 'left':
          this.activeTooltip.style.top = coordsOfElement.top + 'px';
          this.activeTooltip.style.left = coordsOfElement.left - coordsOfTooltip.width + 'px';
          break;

        case 'right':
          this.activeTooltip.style.top = coordsOfElement.top + 'px';
          this.activeTooltip.style.left = coordsOfElement.left + coordsOfElement.width + 'px';
          break;
    }    
  }
}

new Tooltip();