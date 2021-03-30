const themeSwitchButton = document.getElementById("themeSwitch-button");
const backgroundImage = document.getElementById("backgroundImage");
const addTodoButton = document.getElementById("addtodo");
const todoListContainer = document.getElementById("todoListContainer");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

let theme = LIGHT_THEME;

let todoList = [
  { name: "Complete online JavaScript Course", completed: true },
  { name: "Jog around the park 3x", completed: false },
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

// addTodoButton;.addEventListener("click",)

todoList.forEach((todo) => {
  const element = document.createElement("li");
  element.classList.add("list__item");
  if (todo.completed) element.classList.add("completed");
  const circleEl = document.createElement("button");
  circleEl.classList.add("circle");
  element.appendChild(circleEl);
  element.textContent = todo.name;
  todoListContainer.prepend(element);
});
