const $nav = document.getElementById("nav");
const $openNav = document.getElementById("open");
const $closeNav = document.getElementById("close");

// Variable para almacenar la posición del scroll
let scrollPosition = 0;

// Función para abrir el menú
function openMenu() {
  // Guardar la posición actual del scroll
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  $nav.classList.add("visible");
  document.body.classList.add("menu-open");
  $openNav.setAttribute("aria-expanded", "true");
  $nav.setAttribute("aria-hidden", "false");
  
  // Establecer la posición del body para evitar saltos
  document.body.style.top = `-${scrollPosition}px`;
  
  // Ocultar botón de abrir
  $openNav.style.opacity = "0";
  $openNav.style.visibility = "hidden";
  $openNav.style.transform = "scale(0.8)";
  $openNav.style.pointerEvents = "none";
  
  // Mostrar botón de cerrar
  $closeNav.style.opacity = "1";
  $closeNav.style.visibility = "visible";
  $closeNav.style.transform = "scale(1)";
  $closeNav.style.pointerEvents = "all";
  $closeNav.style.display = "flex";
  
  // Forzar el foco al botón de cerrar para accesibilidad
  setTimeout(() => {
    $closeNav.focus();
  }, 100);
}

// Función para cerrar el menú
function closeMenu() {
  $nav.classList.remove("visible");
  document.body.classList.remove("menu-open");
  $openNav.setAttribute("aria-expanded", "false");
  $nav.setAttribute("aria-hidden", "true");
  
  // Restaurar la posición del scroll
  document.body.style.top = '';
  window.scrollTo(0, scrollPosition);
  
  // Mostrar botón de abrir
  $openNav.style.opacity = "1";
  $openNav.style.visibility = "visible";
  $openNav.style.transform = "scale(1)";
  $openNav.style.pointerEvents = "all";
  
  // Ocultar botón de cerrar
  $closeNav.style.opacity = "0";
  $closeNav.style.visibility = "hidden";
  $closeNav.style.transform = "scale(0.8)";
  $closeNav.style.pointerEvents = "none";
  
  // Devolver el foco al botón de abrir
  setTimeout(() => {
    $openNav.focus();
  }, 100);
}

// Event listeners
$openNav.addEventListener("click", openMenu);
$closeNav.addEventListener("click", closeMenu);

// Cerrar menú con tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $nav.classList.contains("visible")) {
    closeMenu();
  }
});

// Cerrar menú al hacer click en un enlace
const $navLinks = $nav.querySelectorAll("a");
$navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Cerrar menú al hacer click fuera de él (en el overlay)
$nav.addEventListener("click", (e) => {
  if (e.target === $nav) {
    closeMenu();
  }
});

// Mejorar accesibilidad
$openNav.setAttribute("aria-label", "Abrir menú de navegación");
$closeNav.setAttribute("aria-label", "Cerrar menú de navegación");
$openNav.setAttribute("aria-expanded", "false");
$nav.setAttribute("aria-hidden", "true");

// Prevenir scroll en dispositivos táctiles
document.addEventListener('touchmove', function(e) {
  if (document.body.classList.contains('menu-open')) {
    e.preventDefault();
  }
}, { passive: false });

// Asegurar estado inicial correcto
document.addEventListener('DOMContentLoaded', function() {
  // Estado inicial: mostrar solo botón de abrir
  $openNav.style.opacity = "1";
  $openNav.style.visibility = "visible";
  $openNav.style.transform = "scale(1)";
  $openNav.style.pointerEvents = "all";
  
  // Estado inicial: ocultar botón de cerrar
  $closeNav.style.opacity = "0";
  $closeNav.style.visibility = "hidden";
  $closeNav.style.transform = "scale(0.8)";
  $closeNav.style.pointerEvents = "none";
});
