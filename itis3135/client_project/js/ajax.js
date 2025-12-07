document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("load-more");
  const container = document.getElementById("ajax-content");

  if (loadBtn && container) {
    loadBtn.addEventListener("click", async () => {
      container.textContent = "Loading...";
      try {
        const res = await fetch("extra_info.txt");
        if (!res.ok) throw new Error("Network response was not ok");
        const text = await res.text();
        container.innerHTML = text;
      } catch (err) {
        container.textContent = "Unable to load content.";
        console.error(err);
      }
    });
  }
});