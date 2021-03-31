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

// Theme Functions
themeSwitchButton.addEventListener("click", switchTheme);

function changeElements(theme) {
  backgroundImage.src = `./images/bg-desktop-${theme}.jpg`;
}

function switchTheme() {
  theme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
  changeElements(theme);
}

function updateDOM() {
  todoListContainer.innerHTML = "";
  displayTodoList();
}

function addTodo() {
  todoList.push({
    id: todoList.length + 1,
    name: inputElement.value,
    completed: false,
  });
  updateDOM();
  inputElement.value = "";
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

function deleteTodo(id) {
  todoList = todoList.filter((todo) => todo.id != id);
  updateDOM();
}

function createTodoElement(todo) {
  const element = document.createElement("li");
  element.classList.add("list__item");
  if (todo.completed) element.classList.add("completed");
  element.innerHTML = `<button class="circle" onclick="toggleComplete(${todo.id})"></button>${todo.name}<button class="close" onclick="deleteTodo(${todo.id})"><img src="images/icon-cross.svg"></button>`;
  return element;
}

function displayTodoList() {
  todoList.forEach((todo) => {
    const element = createTodoElement(todo);
    todoListContainer.prepend(element);
  });
}

addTodoButton.addEventListener("click", addTodo);

displayTodoList();
