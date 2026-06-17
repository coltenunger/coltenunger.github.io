// transitions.js

window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  setTimeout(() => {
    overlay.classList.remove("fade-in");
  }, 50);
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  if (link.target === "_blank") return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;

  e.preventDefault();
  const overlay = document.getElementById("overlay");
  overlay.classList.add("fade-in");

  setTimeout(() => {
    window.location.href = href;
  }, 800);
});
