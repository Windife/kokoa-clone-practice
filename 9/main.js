const form = document.querySelector("form");
const numberRange = document.querySelector(".number-range");
const guessNumber = document.querySelector(".guess-number");
const result = document.querySelector(".result");
const winOrLose = document.querySelector(".winorlose");

function playBtnClick(event) {
    event.preventDefault();
    const machinNumber = Math.floor(Math.random() * (Number(numberRange.value) + 1));
    const choseNumber = Number(guessNumber.value);
    result.innerText = `You chose : ${choseNumber}, the machine chose : ${machinNumber}`;

    if ( choseNumber === machinNumber) {
        winOrLose.innerText = "You won!";
    } else {
        winOrLose.innerText = "You lost!";
    }
};

form.addEventListener("submit", playBtnClick);