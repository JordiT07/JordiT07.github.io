document.addEventListener("DOMContentLoaded", () => {
  console.log("Site loaded successfully.");

  // Contact form validation (progressive enhancement)
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("form-feedback");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      feedback.textContent = ""; // clear previous messages

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        feedback.textContent = "Please fill in all fields before submitting.";
        feedback.classList.add("error");
        return;
      }

      // Email format validation (strict but simple)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.classList.add("error");
        return;
      }

      // Success message (client-only; no backend)
      feedback.classList.remove("error");
      feedback.textContent = `Thank you, ${escapeHtml(name)}! Your message has been received.`;
      form.reset();

      // move focus to feedback for accessibility
      feedback.focus();
    });
  }

  // Lightbox for gallery (simple)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  if (document.querySelectorAll(".img-btn").length && lightbox) {
    document.querySelectorAll(".img-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const full = btn.getAttribute("data-full");
        const img = btn.querySelector("img");
        const alt = img ? img.alt : "";
        lightboxImg.src = full;
        lightboxImg.alt = alt;
        lightbox.setAttribute("aria-hidden", "false");
        lightbox.style.display = "flex";
        lightboxClose.focus();
      });
    });

    function closeLightbox() {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
    }
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.style.display === "flex") closeLightbox();
    });
  }

  // Small helper to escape HTML in success messages
  function escapeHtml(str) {
    return str.replace(/[&<>"'`=\/]/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' })[s];
    });
  }
});