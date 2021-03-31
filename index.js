const themeSwitchButton = document.getElementById("themeSwitch-button");
const backgroundImage = document.getElementById("backgroundImage");
const addTodoButton = document.getElementById("addtodoButton");
const todoListContainer = document.getElementById("todoListContainer");
const inputElement = document.getElementById("additemInput");
const countTasks = document.getElementById("countTasks");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

let theme = LIGHT_THEME;

let todoList = [
  { id: 1, name: "Complete online JavaScript Course", completed: true },
  { id: 2, name: "Jog around the park 3x", completed: false },
];

let filteredList = todoList;

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

// Filter items
filterAll.addEventListener("click", () => setFilter("all"));
filterActive.addEventListener("click", () => setFilter("active"));
filterCompleted.addEventListener("click", () => setFilter("completed"));

function setFilter(filter) {
  setActiveFilter(filter);
  switch (filter) {
    case "active":
      filteredList = todoList.filter((todo) => todo.completed === false);
      break;
    case "completed":
      filteredList = todoList.filter((todo) => todo.completed === true);
      break;
    default:
      filteredList = todoList;
      break;
  }
  updateDOM();
}

function setActiveFilter(filter) {
  filterAll.classList.remove("activeFilter");
  filterActive.classList.remove("activeFilter");
  filterCompleted.classList.remove("activeFilter");
  if (filter === "all") filterAll.classList.add("activeFilter");
  if (filter === "active") filterActive.classList.add("activeFilter");
  if (filter === "completed") filterCompleted.classList.add("activeFilter");
}

function getIncompleteItems() {
  return todoList.reduce(
    (acc, curr) => (!curr.completed ? (acc += 1) : acc),
    0
  );
}

function updateDOM() {
  todoListContainer.innerHTML = "";
  countTasks.innerHTML = `${getIncompleteItems()} items left`;
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
  filteredList.forEach((todo) => {
    const element = createTodoElement(todo);
    todoListContainer.prepend(element);
  });
}

addTodoButton.addEventListener("click", addTodo);

updateDOM();
