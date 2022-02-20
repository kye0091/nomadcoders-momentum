const toDoForm = document.querySelector("#to-do-form");
const toDoTitle = document.querySelector(".to-do-list span");
const toDoInput = document.querySelector("#to-do-form input");
const toDoList = document.querySelector(".to-do-list #list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
    const deleteConfirm = confirm("Are you sure you want to delete?");
    if (deleteConfirm) {
        const li = e.target.parentElement.parentElement;
        toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
        li.remove();
        saveToDos();
    }
    else {
        return false;
    };
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;

    const span = document.createElement("span");
    li.appendChild(span);
    span.innerText = newTodo.text;

    const btnBox = document.createElement("div");
    li.appendChild(btnBox);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("button");
    btnDelete.innerText = "❌";
    btnBox.appendChild(btnDelete);

    toDoList.appendChild(li);

    btnDelete.addEventListener("click", deleteToDo);
}

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    saveToDos();
    paintToDo(newTodoObj)
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}