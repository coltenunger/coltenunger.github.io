async function loadProjects() {
  const response = await fetch("json/details.json");
  const projects = await response.json();
  const footer = document.querySelector(".project-footer");

  projects.forEach((project) => {
    if (!project.photoCount) {
      // no photos yet — render plain text instead of a link
      const div = document.createElement("div");
      div.classList.add("project-link", "coming-soon");

      div.innerHTML = `
        <span class="project-name">${project.name}</span>
        <span class="project-category">Coming Soon</span>
        <span class="project-year">${project.year}</span>
      `;

      footer.appendChild(div);
      return;
    }
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
  const sakuraBox = document.getElementById("sakura-container");

  // listens for a hover and changes index preview image accordingly
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      previewImg.classList.remove("visible");
      sakuraBox.classList.remove("visible");

      setTimeout(() => {
        previewImg.src = link.dataset.preview;
        previewImg.classList.add("visible");
      }, 300); // match your transition duration
    });

    link.addEventListener("mouseleave", () => {
      previewImg.classList.remove("visible");
      sakuraBox.classList.add("visible");
    });
  });

  // dimming
  footer.addEventListener("mouseover", (e) => {
    const link = e.target.closest(".project-link");
    if (!link) return;

    links.forEach((l) => l.classList.add("dimmed"));
    link.classList.remove("dimmed");
  });

  footer.addEventListener("mouseout", (e) => {
    const leavingLink = e.target.closest(".project-link");
    const enteringLink = e.relatedTarget?.closest(".project-link");

    if (leavingLink && !enteringLink) {
      links.forEach((l) => l.classList.remove("dimmed"));
    }
  });

  // LEAVE OUT FOR NOW
  setTimeout(() => {
    sakuraBox.classList.add("visible");
  }, 400);
});
