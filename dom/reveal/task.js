const revealElementList = document.querySelectorAll('.reveal');

document.addEventListener('scroll', () => {
  for (let i = 0; i < revealElementList.length; i++) {
    let element = revealElementList[i];

    if (isRevealBlockVisible(element)) {
      if (!element.classList.contains('reveal_active')) {
        element.classList.add('reveal_active');
      }      
    } else {
      if (element.classList.contains('reveal_active')) {
        element.classList.remove('reveal_active');
      }  
    }
  }
  
});

function isRevealBlockVisible(element) {
  const { top, bottom } = element.getBoundingClientRect();
  return bottom >= 0 && top <= window.innerHeight;
}