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
  { id: 3, name: "Complete  JavaScript Course", completed: true },
  { id: 4, name: "Jog  the park 3x", completed: false },
];

let filteredList = todoList;
let activeFilter = "all";

let draggedItem;
let dragging = false;
let itemItIsOver;

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
  setActiveFilterButtonState(filter);
  activeFilter = filter;
  updateDOM();
}

function filterTodoList(filter) {
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
}

function setActiveFilterButtonState(filter) {
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

// Functionalities

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

function clearCompelted() {
  todoList = todoList.filter((todo) => todo.completed != true);
  setFilter("all");
}

// Drag and drop related functions
function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

function drop(event) {
  event.preventDefault();
  const dropPlaceId = parseInt(itemItIsOver.getAttribute("todoid"));
  const dorpItemId = parseInt(event.target.getAttribute("todoid"));
  let itemToInsert;
  let placeToInsert;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === dorpItemId) {
      itemToInsert = Object.assign(todoList[i]);
    }
    if (todoList[i].id === dropPlaceId) placeToInsert = i;
  }
  todoList = todoList.filter((todo) => todo.id != itemToInsert.id);
  const firstHalf = todoList.slice(0, placeToInsert);
  const secondHalf = todoList.slice(placeToInsert);
  todoList = [...firstHalf, itemToInsert, ...secondHalf];

  updateDOM();
}

function dragEntered(e) {
  itemItIsOver = e.target;
}

function createTodoElement(todo) {
  const element = document.createElement("li");
  element.setAttribute("todoid", todo.id);
  element.classList.add("list__item");
  if (todo.completed) element.classList.add("completed");
  element.innerHTML = `<button class="circle" onclick="toggleComplete(${todo.id})"></button>${todo.name}<button class="close" onclick="deleteTodo(${todo.id})"><img src="images/icon-cross.svg"></button>`;
  element.draggable = true;
  element.setAttribute("ondragstart", "drag(event)");
  element.setAttribute("ondragenter", "dragEntered(event)");
  element.setAttribute("ondragend", "drop(event)");
  return element;
}

function displayTodoList() {
  filteredList.forEach((todo) => {
    const element = createTodoElement(todo);
    todoListContainer.prepend(element);
  });
}
function updateDOM() {
  todoListContainer.innerHTML = "";
  countTasks.innerHTML = `${getIncompleteItems()} items left`;
  filterTodoList(activeFilter);
  displayTodoList();
}

addTodoButton.addEventListener("click", addTodo);

updateDOM();
