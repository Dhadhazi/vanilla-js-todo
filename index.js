const themeSwitchButton = document.getElementById("themeSwitch-button");
const backgroundImage = document.getElementById("backgroundImage");
const addTodoButton = document.getElementById("addtodoButton");
const todoListContainer = document.getElementById("todoListContainer");
const inputElement = document.getElementById("additemInput");
const countTasks = document.getElementById("countTasks");

const filterAll = document.querySelectorAll(".filterAll");
const filterActive = document.getElementsByClassName("filterActive");
const filterCompleted = document.getElementsByClassName("filterCompleted");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

let theme = LIGHT_THEME;

let todoList = [
  { id: 1, name: "Complete online JavaScript Course", completed: true },
  { id: 2, name: "Jog around the park 3x", completed: false },
  { id: 3, name: "10 minutes meditation", completed: false },
  { id: 4, name: "Read for 1 hour", completed: false },
  { id: 5, name: "Pick up groceries", completed: false },
  { id: 6, name: "Complete Todo App on Frontend Mentor", completed: false },
];

let filteredList = todoList;
let activeFilter = "all";

let draggedItem;
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
for (let i = 0; i < filterAll.length; i++) {
  filterAll[i].addEventListener("click", () => setFilter("all"));
  filterActive[i].addEventListener("click", () => setFilter("active"));
  filterCompleted[i].addEventListener("click", () => setFilter("completed"));
}

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
  for (let i = 0; i < filterAll.length; i++) {
    filterAll[i].classList.remove("activeFilter");
    filterActive[i].classList.remove("activeFilter");
    filterCompleted[i].classList.remove("activeFilter");
    if (filter === "all") filterAll[i].classList.add("activeFilter");
    if (filter === "active") filterActive[i].classList.add("activeFilter");
    if (filter === "completed")
      filterCompleted[i].classList.add("activeFilter");
  }
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
}

function drop(event) {
  event.preventDefault();
  itemItIsOver.classList.remove("dragIsOverThis");
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
  if (itemItIsOver) itemItIsOver.classList.remove("dragIsOverThis");
  itemItIsOver = e.target;
  e.target.classList.add("dragIsOverThis");
}

function dragLeave(e) {}

function createTodoElement(todo) {
  const element = document.createElement("li");
  element.setAttribute("todoid", todo.id);
  element.classList.add("list__item");
  if (todo.completed) element.classList.add("completed");
  element.innerHTML = `<button class="circle" onclick="toggleComplete(${todo.id})" aria-label="Button for task completion"></button>${todo.name}<button class="close" onclick="deleteTodo(${todo.id})"><img src="images/icon-cross.svg" alt="Delete task"></button>`;
  element.draggable = true;
  element.setAttribute("ondragstart", "drag(event)");
  element.setAttribute("ondragenter", "dragEntered(event)");
  element.setAttribute("ondragleave", "dragLeave(event)");
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
