// Matrix Rain Effect by Boujjou Achraf
// Adapted for portfolio background

function initMatrixBackground() {
  // Getting canvas
  var c = document.getElementById("matrix-bg");
  if (!c) return;

  var ctx = c.getContext("2d");

  // Characters for the matrix effect
  var matrix =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  // Converting the string into an array of single characters
  matrix = matrix.split("");

  var font_size = 10;
  var columns;
  var drops = [];
  var lastWidth = 0;
  var lastHeight = 0;
  var resizeTimeout;

  // Initialize canvas size
  function initSize() {
    // Use document.documentElement for more stable dimensions
    var newWidth = window.innerWidth;
    var newHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    // Only resize if there's a significant change (more than 50px)
    if (
      Math.abs(newWidth - lastWidth) > 50 ||
      Math.abs(newHeight - lastHeight) > 50
    ) {
      c.width = newWidth;
      c.height = newHeight;
      columns = Math.floor(c.width / font_size);

      // Preserve existing drops positions when resizing
      var newDrops = [];
      for (var x = 0; x < columns; x++) {
        // If we had a drop at this position, keep its progress
        if (x < drops.length && drops[x]) {
          newDrops[x] = drops[x];
        } else {
          // Otherwise, randomize the starting position for smoother transitions
          newDrops[x] = Math.floor(Math.random() * (c.height / font_size));
        }
      }
      drops = newDrops;

      lastWidth = newWidth;
      lastHeight = newHeight;
    }
  }

  // Initial setup
  initSize();

  // Drawing the characters
  function draw() {
    // Black BG for the canvas
    // Translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#888"; // Gray text to match portfolio colors
    ctx.font = font_size + "px arial";
    // Looping over drops
    for (var i = 0; i < drops.length; i++) {
      // A random character to print
      var text = matrix[Math.floor(Math.random() * matrix.length)];
      // x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      // Sending the drop back to the top randomly after it has crossed the screen
      // Adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;

      // Incrementing Y coordinate
      drops[i]++;
    }
  }

  setInterval(draw, 35);

  // Debounced resize handler to avoid frequent redraws
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      initSize();
    }, 250); // Wait 250ms after resize stops
  });

  // Handle orientation change on mobile devices
  window.addEventListener("orientationchange", function () {
    setTimeout(function () {
      initSize();
    }, 100);
  });
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMatrixBackground);
} else {
  initMatrixBackground();
}
