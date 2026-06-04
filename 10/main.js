const clockTitle = document.querySelector('.js-clock');

function waitChristmas() {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  let christmasDay = new Date(nowYear, 11, 25);

  if (nowDate > christmasDay) {
    christmasDay = new Date(nowYear + 1, 11, 25);
  }

  const date = christmasDay - nowDate;

  const days = Math.floor(date / (1000 * 60 * 60 * 24));
  const hours = String(Math.floor((date / (1000 * 60 * 60)) % 24)).padStart(
    2,
    '0'
  );
  const minutes = String(Math.floor((date / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  );
  const seconds = String(Math.floor((date / 1000) % 60)).padStart(2, '0');

  clockTitle.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

waitChristmas();
setInterval(waitChristmas, 1000);
