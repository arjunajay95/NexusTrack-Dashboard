// javascript here

const dark_mode = document.getElementById("dark-mode-toggle");
const dark_mode_svgs = dark_mode.querySelectorAll("svg");
const light_mode_icon = dark_mode_svgs[0];
const dark_mode_icon = dark_mode_svgs[1];

dark_mode.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  [light_mode_icon, dark_mode_icon].forEach((svg) => {
    svg.classList.toggle("hidden");
  });
});
