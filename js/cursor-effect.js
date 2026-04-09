// Efecto de cursor estilo coordenadas (líneas verticales y horizontales)
class CursorEffect {
  constructor() {
    this.init();
  }

  init() {
    this.createCrosshair();

    // Event listener para el movimiento del mouse
    document.addEventListener("mousemove", (e) => {
      this.updateCrosshair(e);
    });
  }

  createCrosshair() {
    this.lineX = document.createElement("div");
    this.lineX.className = "cursor-crosshair cursor-crosshair-x";

    this.lineY = document.createElement("div");
    this.lineY.className = "cursor-crosshair cursor-crosshair-y";

    document.body.appendChild(this.lineX);
    document.body.appendChild(this.lineY);
  }

  updateCrosshair(e) {
    // Actualizar posición de las líneas
    // Usamos transform para mejor rendimiento
    this.lineY.style.transform = `translateX(${e.clientX}px)`;
    this.lineX.style.transform = `translateY(${e.clientY}px)`;
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CursorEffect();
  });
} else {
  new CursorEffect();
}
