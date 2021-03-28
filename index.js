const themeSwitchButton = document.getElementById("themeSwitch-button");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

let theme = LIGHT_THEME;

function changeElements(theme) {
  if (theme === LIGHT_THEME) {
    themeSwitchButton.children[0].classList.replace("fa-sun", "fa-moon");
  }
  if (theme === DARK_THEME) {
    themeSwitchButton.children[0].classList.replace("fa-moon", "fa-sun");
  }
}

function switchTheme() {
  theme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
  changeElements(theme);
}

themeSwitchButton.addEventListener("click", switchTheme);
