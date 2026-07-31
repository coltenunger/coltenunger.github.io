function fadeOutOverlay() {
  const fadeTransition = document.getElementById("transition");
  setTimeout(() => {
    fadeTransition.classList.remove("fade-in");
  }, 50);
}

window.addEventListener("DOMContentLoaded", fadeOutOverlay);

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    // page was restored from bfcache, not freshly loaded
    fadeOutOverlay();
  }
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link || link.target === "_blank") return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;

  e.preventDefault();

  const fadeTransition = document.getElementById("transition");
  fadeTransition.classList.add("fade-in");

  setTimeout(() => {
    window.location.href = href;
  }, 800);
});
