const $nav = document.getElementById("nav");
const $openNav = document.getElementById("open");
const $closeNav = document.getElementById("close");

$openNav.addEventListener("click", () => {
  $nav.classList.add("visible");
});

$closeNav.addEventListener("click", () => {
  $nav.classList.remove("visible");
});
