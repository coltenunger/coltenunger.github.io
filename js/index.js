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
  const links = document.querySelectorAll(".project-link");
  const previewImg = document.getElementById("preview-image");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      previewImg.src = link.dataset.preview;
      previewImg.classList.add("visible");
    });

    link.addEventListener("mouseleave", () => {
      previewImg.classList.remove("visible");
    });
  });
});
