const typed = new Typed(".typed", {
  strings: ["Jesus Antonio", "JesDev12U"],
  loop: true,
  typeSpeed: 75,
  backSpeed: 75,
  backdelay: 2000,
});

const typed2 = new Typed(".typed2", {
  strings: ["Informático", "Desarrollador", "Fullstack"],
  loop: true,
  typeSpeed: 75,
  backSpeed: 75,
  backdelay: 2000,
});

const typed3 = new Typed(".typed3", {
  strings: [
    "Bienvenido a mi portafolio!",
    "En este sitio podrás ver mis proyectos y más",
    "¡Espero les guste!",
  ],
  loop: true,
  typeSpeed: 75,
  backSpeed: 75,
  backdelay: 2000,
});

let currentProject = 0;
const projects = document.querySelectorAll(".card-project");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function updateProject() {
  projects.forEach((project, index) => {
    if (index === currentProject) {
      project.classList.add("visible");
    } else {
      project.classList.remove("visible");
    }
  });
}

prevButton.addEventListener("click", () => {
  currentProject =
    currentProject > 0 ? currentProject - 1 : projects.length - 1;
  updateProject();
});

nextButton.addEventListener("click", () => {
  currentProject =
    currentProject < projects.length - 1 ? currentProject + 1 : 0;
  updateProject();
});

updateProject();
