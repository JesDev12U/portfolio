const typed = new Typed(".typed", {
  strings: ["Jesus Antonio", "JesDev12U"],
  loop: true,
  typeSpeed: 75,
  backSpeed: 75,
  backdelay: 2000,
});

const typed2 = new Typed(".typed2", {
  strings: ["Informático", "Desarrollador", "Fullstack", "Becario Fullstack"],
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

// Ultra-Fluid Project Slider with Natural Drag Support
class ProjectSlider {
  constructor() {
    this.currentIndex = 0;
    this.projects = document.querySelectorAll(".card-project");
    this.dots = document.querySelectorAll(".dot");
    this.isAnimating = false;
    this.autoSlideInterval = null;

    // Drag properties for ultra-fluid experience
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.draggedElement = null;
    this.originalTransform = "";
    this.animationFrame = null;

    this.init();
  }

  init() {
    if (this.projects.length === 0) return;

    this.createCards();
    this.setupEventListeners();
    this.updateSlider();
    this.startAutoSlide();
  }

  createCards() {
    this.projects.forEach((project, index) => {
      project.style.position = "absolute";
      project.style.top = "50%";
      project.style.left = "50%";
      project.style.transform = this.getCardTransform(index);
      project.style.transition = "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
      project.style.cursor = "grab";
      project.dataset.index = index;

      // Performance optimizations for smooth dragging
      project.style.willChange = "transform, opacity";
      project.style.backfaceVisibility = "hidden";
    });
  }

  getCardTransform(index) {
    const isMobile = window.innerWidth <= 600;
    const baseTranslateX = isMobile ? 18 : 30;
    const baseTranslateY = isMobile ? 6 : 10;
    const baseRotation = isMobile ? 2 : 3;

    const offset = index - this.currentIndex;
    const scale = index === this.currentIndex ? 1 : 0.8;
    const zIndex = index === this.currentIndex ? 100 : 50 - Math.abs(offset);
    const rotation = offset * baseRotation;
    const translateX = offset * baseTranslateX;
    const translateY = offset * baseTranslateY;
    const opacity = index === this.currentIndex ? 1 : 0.7;

    // Apply styles directly for better performance
    this.projects[index].style.zIndex = zIndex;
    this.projects[index].style.opacity = opacity;

    return `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateZ(${rotation}deg)`;
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.projects.forEach((_, idx) => {
        this.projects[idx].style.transform = this.getCardTransform(idx);
      });
    });
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!this.isAnimating) {
          this.goToSlide(index);
        }
      });
    });

    // Mouse drag events with immediate response
    this.projects.forEach((project) => {
      project.addEventListener("mousedown", this.handleDragStart.bind(this), {
        passive: false,
      });
    });

    // Global events for ultra-smooth dragging
    document.addEventListener("mousemove", this.handleDragMove.bind(this), {
      passive: false,
    });
    document.addEventListener("mouseup", this.handleDragEnd.bind(this), {
      passive: false,
    });

    // Touch events for mobile
    this.projects.forEach((project) => {
      project.addEventListener("touchstart", this.handleDragStart.bind(this), {
        passive: false,
      });
    });

    document.addEventListener("touchmove", this.handleDragMove.bind(this), {
      passive: false,
    });
    document.addEventListener("touchend", this.handleDragEnd.bind(this), {
      passive: false,
    });

    // Prevent context menu on right click
    this.projects.forEach((project) => {
      project.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  handleDragStart(e) {
    e.preventDefault();

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    this.isDragging = true;
    this.startX = clientX;
    this.startY = clientY;
    this.currentX = clientX;
    this.currentY = clientY;
    this.draggedElement = e.currentTarget;
    this.originalTransform = this.draggedElement.style.transform;

    // Immediate visual feedback - like grabbing with your hand
    this.draggedElement.style.cursor = "grabbing";
    this.draggedElement.classList.add("dragging");
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    // Remove transitions for real-time movement
    this.draggedElement.style.transition = "none";

    this.stopAutoSlide();
  }

  handleDragMove(e) {
    if (!this.isDragging || !this.draggedElement) return;

    e.preventDefault();

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    this.currentX = clientX;
    this.currentY = clientY;

    // Cancel previous animation frame for maximum smoothness
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Use requestAnimationFrame for 60fps fluid movement
    this.animationFrame = requestAnimationFrame(() => {
      if (!this.isDragging || !this.draggedElement) return;

      const deltaX = this.currentX - this.startX;
      const deltaY = this.currentY - this.startY;

      // Natural movement calculations - like moving a real card
      const scale = 1 + Math.abs(deltaX) * 0.0003;
      const rotation = deltaX * 0.08;
      const opacity = Math.max(0.85, 1 - Math.abs(deltaX) * 0.001);

      // Direct transform for instant response
      this.draggedElement.style.transform = `${
        this.originalTransform
      } translateX(${deltaX}px) translateY(${
        deltaY * 0.3
      }px) scale(${scale}) rotateZ(${rotation}deg)`;
      this.draggedElement.style.opacity = opacity;
      this.draggedElement.style.zIndex = 1000;
    });
  }

  handleDragEnd(e) {
    if (!this.isDragging || !this.draggedElement) return;

    const deltaX = this.currentX - this.startX;
    const threshold = 60;

    // Cancel any pending animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    // Reset visual state
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    this.draggedElement.classList.remove("dragging");
    this.draggedElement.style.cursor = "grab";

    // Navigation decision based on drag distance
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    } else {
      // Smooth snap back to original position
      this.draggedElement.style.transition =
        "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
      this.draggedElement.style.transform = this.originalTransform;
      this.draggedElement.style.opacity = "";
      this.draggedElement.style.zIndex = "";
    }

    // Reset drag state
    this.isDragging = false;
    this.draggedElement = null;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.startAutoSlide();
  }

  handleDragEnd(e) {
    if (!this.isDragging || !this.draggedElement) return;

    const deltaX = this.currentX - this.startX;
    const threshold = 60;

    // Cancel any pending animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    // Reset visual state
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    this.draggedElement.classList.remove("dragging");
    this.draggedElement.style.cursor = "grab";

    // Navigation decision based on drag distance
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    } else {
      // Smooth snap back to original position
      this.draggedElement.style.transition =
        "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
      this.draggedElement.style.transform = this.originalTransform;
      this.draggedElement.style.opacity = "";
      this.draggedElement.style.zIndex = "";
    }

    // Reset drag state
    this.isDragging = false;
    this.draggedElement = null;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.startAutoSlide();
  }

  updateSlider() {
    this.projects.forEach((project, index) => {
      project.style.transform = this.getCardTransform(index);
    });

    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  goToSlide(index) {
    if (index === this.currentIndex || this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = index;
    this.updateSlider();

    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.projects.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex =
      (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.goToSlide(prevIndex);
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".card-project")) {
    new ProjectSlider();
  }

  // Intersection Observer para animaciones de scroll
  initScrollAnimations();
});

// Fallback for immediate execution if DOM is already loaded
if (document.readyState !== "loading") {
  if (document.querySelector(".card-project")) {
    new ProjectSlider();
  }
  initScrollAnimations();
}

// Función para inicializar las animaciones de scroll
function initScrollAnimations() {
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Remover la clase cuando sale del viewport para que se anime de nuevo
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Smooth scroll mejorado para todos los enlaces de navegación
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar todos los enlaces que apuntan a secciones (nav y footer)
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // Ignorar enlaces vacíos

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calcular la posición considerando el header
        const headerOffset = 100; // Offset mayor para que aparezca más arriba
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Scroll suave mejorado
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
