Promise.all([
  fetch("/components/nav-header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("nav-header").innerHTML = data;
    }),
]).then(() => {
  const navToggle = document.getElementById("nav-toggle");
  navToggle.textContent = "index";
  navToggle.href = "/";

  function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent = now
      .toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })
      .replace(/,/g, "");
  }

  updateClock();
  setInterval(updateClock, 1000);

  document.getElementById("copyright").textContent =
    `[Copyright] ${new Date().getFullYear()} Colten Wade`;
});
