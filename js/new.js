async function loadProjects() {
  const response = await fetch("json/details.json");
  const projects = await response.json();
  const footer = document.querySelector(".project-footer");

  projects.forEach((project) => {
    const a = document.createElement("a");
    a.href = project.url;
    a.classList.add("project-link", "unstyle-link");
    a.dataset.preview = project.preview;

    a.innerHTML = `
      <span class="project-name">${project.name}</span>
      <span class="project-category">${project.category}</span>
      <span class="project-year">${project.year}</span>
    `;

    footer.appendChild(a);
  });
}

Promise.all([
  fetch("components/nav-header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("nav-header").innerHTML = data;
    }),
  loadProjects(),
]).then(() => {
  const navToggle = document.getElementById("nav-toggle");
  navToggle.textContent = "info";
  navToggle.href = "/info.html";

  const links = document.querySelectorAll(".project-link");
  const previewImg = document.getElementById("preview-image");
  const footer = document.querySelector(".project-footer");

  // listens for a hover and changes index preview image accordingly
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      previewImg.classList.remove("visible");

      setTimeout(() => {
        previewImg.src = link.dataset.preview;
        previewImg.classList.add("visible");
      }, 300); // match your transition duration
    });

    link.addEventListener("mouseleave", () => {
      previewImg.classList.remove("visible");
    });
  });

  // dimming
  footer.addEventListener("mouseover", (e) => {
    const link = e.target.closest(".project-link");
    if (!link) return;

    links.forEach((l) => l.classList.add("dimmed"));
    link.classList.remove("dimmed");
  });

  footer.addEventListener("mouseleave", () => {
    links.forEach((l) => l.classList.remove("dimmed"));
  });
});
