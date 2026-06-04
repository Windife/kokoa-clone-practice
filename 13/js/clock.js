const clockTitle = document.querySelector(".clock-title");
const clockSubTitle = document.querySelector(".clock-subtitle");

function clock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clockTitle.innerText = `${hours}시 ${minutes}분 ${seconds}초`;
}

function date() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = date.getDay();
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeekString = daysOfWeek[dayOfWeek];
    clockSubTitle.innerText = `${year}년 ${month}월 ${day}일 ${dayOfWeekString}요일`;
}

clock();
date();
setInterval(clock, 1000);
setInterval(date, 1000);
