
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("tooCount");
const deleteButton = document.getElementById("deleteButton");


document.addEventListener("DOMContentLoaded", function () {
    todoInput.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });

}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

const darkmode = document.querySelector(".darkmode")
const sun = document.querySelector(".sun")
const moon = document.querySelector(".moon")
const body = document.body;
const main = document.querySelector(".mode")

const todosection = document.querySelector(".todo")
darkmode.addEventListener('click', () => {
  if(moon.style.display === "none") {
    sun.style.display = 'none'
    moon.style.display = "block";
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    todoInput.classList.remove('dark-mode');
    todoInput.classList.add('light-mode');
    main.style.background = "url(./img-folder/background-img.jpg)";
    main.style.backgroundRepeat = "no-repeat";
    main.style.backgroundSize = "cover";
    main.style.backgroundPositionX = "100%";
    todosection.classList.remove('dark-mode');

  } else {
    sun.style.display = "block";
    moon.style.display = "none";
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    todoInput.classList.remove('dark-mode');
    todoInput.classList.add('light-mode');
    main.style.background = "url(./img-folder/dark-img.jpg)";
    main.style.backgroundRepeat = "no-repeat";
    main.style.backgroundSize = "cover";
    main.style.backgroundPositionX = "100%";
    todoInput.classList.add('dark-mode');
    todosection.classList.add('dark-mode');
    todoList.style.color = 'white'
    
  }
})
