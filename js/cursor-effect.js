// Efecto de binarios siguiendo el cursor
class CursorEffect {
  constructor() {
    this.particles = [];
    this.maxParticles = 15;
    this.init();
  }

  init() {
    // Event listener para el movimiento del mouse
    document.addEventListener("mousemove", (e) => {
      this.createParticle(e);
    });
  }

  createParticle(e) {
    // Limitar el número de partículas
    if (this.particles.length > this.maxParticles) {
      const oldParticle = this.particles.shift();
      if (oldParticle && oldParticle.parentNode) {
        oldParticle.parentNode.removeChild(oldParticle);
      }
    }

    const particle = document.createElement("div");
    particle.className = "cursor-particle";

    // Números binarios aleatorios (0 o 1) con algunos caracteres especiales
    const chars = ["0", "1", "0", "1", "0", "1", "01", "10"];
    const binary = chars[Math.floor(Math.random() * chars.length)];
    particle.textContent = binary;

    // Posicionar en la ubicación del cursor
    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";

    // Variación aleatoria en el desplazamiento
    const randomX = (Math.random() - 0.5) * 40;
    const randomY = (Math.random() - 0.5) * 40;
    particle.style.setProperty("--random-x", randomX + "px");
    particle.style.setProperty("--random-y", randomY + "px");

    document.body.appendChild(particle);
    this.particles.push(particle);

    // Remover después de la animación
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        this.particles = this.particles.filter((p) => p !== particle);
      }
    }, 1000);
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
