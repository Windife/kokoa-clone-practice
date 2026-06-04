const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');

function backGroundColorChange() {
  const windowSize = innerWidth;
  if (500 > windowSize) {
    h1.style.color = 'rgb(255,255,255)';
    p.style.color = 'rgb(255,255,255)';
    body.style.backgroundColor = 'rgb(0,0,255)';
  } else if (1000 > windowSize && windowSize >= 500) {
    h1.style.color = 'rgb(255,255,255)';
    p.style.color = 'rgb(255,255,255)';
    body.style.backgroundColor = 'rgb(255,0,255)';
  } else {
    h1.style.color = 'rgb(0,0,0)';
    p.style.color = 'rgb(0,0,0)';
    body.style.backgroundColor = 'rgb(255,255,0)';
  }
}

function windowWidthViewer() {
  const windowWidth = innerWidth;
  p.innerText = 'Your window is ' + windowWidth + 'px';
}

window.addEventListener('resize', windowWidthViewer);
window.addEventListener('resize', backGroundColorChange);
