document.addEventListener("DOMContentLoaded", () => {
  console.log("Site loaded successfully.");

  // Contact form validation
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      // Email format validation
      const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Success message
      alert("Thank you, " + name + "! Your message has been received.");
      form.reset();
    });
  }
});