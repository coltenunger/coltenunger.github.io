async function init() {
  await loadComponent("/components/nav-header.html", "nav-header");
  setNavToggle("INDEX", "/");

  function updateClock() {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    
    document.getElementById("clock").textContent = formatted.replace(/(\d{1,2}), /, "$1 ");
  }

  updateClock();
  setInterval(updateClock, 1000);

  document.getElementById("copyright").textContent = `[Copyright] ${new Date().getFullYear()} Colten Wade`;
}

document.addEventListener("DOMContentLoaded", init);
