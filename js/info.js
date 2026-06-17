// js/info.js
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
});
