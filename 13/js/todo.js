const toDoForm = document.querySelector(".todo-form");
const toDoInput = document.querySelector(".todo-form input");
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text : newToDo,
        id : Date.now(),
        checked : false,
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

function paintToDo(newToDo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    button.innerText = "X";
    button.addEventListener("click", deleteToDo);
    toDoList.appendChild(li);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    checkbox.addEventListener("change", checkBoxChecked);
    span.innerText = newToDo.text;
    li.id = newToDo.id;
    checkbox.checked = newToDo.checked;

    if (newToDo.checked) {
        span.style.textDecoration = "line-through";
        span.style.color = "gray";
    } else {
        span.style.textDecoration = "none";
        span.style.color = "black";
    }
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();    
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

function checkBoxChecked (event) {
    const li = event.target.parentElement;
    const span = li.querySelector("span");
    const toDoId = parseInt(li.id);
    const toDo = toDos.find((item) => item.id === toDoId);

    if (event.target.checked) {
        span.style.textDecoration = "line-through";
        span.style.color = "gray";
        toDo.checked = true;
    } else {
        span.style.textDecoration = "none";
        span.style.color = "black";
        toDo.checked = false;
        }
        saveToDos();
    };