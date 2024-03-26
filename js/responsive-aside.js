const $openAside = document.querySelector(".open-info");
const $closeAside = document.querySelector(".close-info");
const $aside = document.querySelector(".aside");

$openAside.addEventListener("click", () => {
  $aside.classList.add("visible");
});

$closeAside.addEventListener("click", () => {
  $aside.classList.remove("visible");
});
