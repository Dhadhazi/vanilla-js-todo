const themeSwitchButton = document.getElementById("themeSwitch-button");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

let theme = LIGHT_THEME;

function switchTheme() {
  theme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
}

themeSwitchButton.addEventListener("click", switchTheme);
