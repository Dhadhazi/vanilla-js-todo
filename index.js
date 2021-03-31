const themeSwitchButton = document.getElementById("themeSwitch-button");
const backgroundImage = document.getElementById("backgroundImage");
const addTodoButton = document.getElementById("addtodoButton");
const todoListContainer = document.getElementById("todoListContainer");
const inputElement = document.getElementById("additemInput");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

let theme = LIGHT_THEME;

let todoList = [
  { id: 1, name: "Complete online JavaScript Course", completed: true },
  { id: 2, name: "Jog around the park 3x", completed: false },
];

function changeElements(theme) {
  backgroundImage.src = `./images/bg-desktop-${theme}.jpg`;
}

function switchTheme() {
  theme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
  changeElements(theme);
}

themeSwitchButton.addEventListener("click", switchTheme);

function addTodo() {
  todoList.push({
    id: todoList.length,
    name: inputElement.value,
    completed: false,
  });
  updateDOM();
  inputElement.value = "";
}

addTodoButton.addEventListener("click", addTodo);

function updateDOM() {
  todoListContainer.innerHTML = "";
  displayTodoList();
}

function toggleComplete(id) {
  todoList.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  updateDOM();
}

function displayTodoList() {
  todoList.forEach((todo) => {
    const element = document.createElement("li");
    element.classList.add("list__item");
    if (todo.completed) element.classList.add("completed");
    element.innerHTML = `<button class="circle" onclick="toggleComplete(${todo.id})"></button>${todo.name}<button class="close"><img src="images/icon-cross.svg"></button>`;
    todoListContainer.prepend(element);
  });
}

displayTodoList();
