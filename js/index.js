async function loadProjects() {
  const response = await fetch("json/details.json");
  const projects = await response.json();
  const footer = document.querySelector(".project-footer");
  const previewContainer = document.getElementById("preview-container");

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
    a.dataset.slug = project.slug;

    a.innerHTML = `
      <span class="project-name">${project.name}</span>
      <span class="project-category">${project.category}</span>
      <span class="project-year">${project.year}</span>
    `;

    footer.appendChild(a);

    // pre-load the preview image, stacked and hidden by default
    const img = document.createElement("img");
    img.id = `preview-${project.slug}`;
    img.src = project.preview;
    img.alt = project.name;
    previewContainer.appendChild(img);
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
  navToggle.textContent = "INFO";
  navToggle.href = "/info.html";

  const links = document.querySelectorAll(".project-link");
  const footer = document.querySelector(".project-footer");
  const sakuraBox = document.getElementById("sakura-container");

  let hoverCount = 0;
  let activeImg = null;

  links.forEach((link) => {
    if (link.classList.contains("coming-soon")) return; // skip preview logic entirely if project has no photos

    link.addEventListener("mouseenter", () => {
      hoverCount++;
      if (hoverCount === 1) sakuraBox.classList.remove("visible");

      const img = document.getElementById(`preview-${link.dataset.slug}`);
      if (activeImg && activeImg !== img) activeImg.classList.remove("visible");
      img.classList.add("visible");
      activeImg = img;
    });

    link.addEventListener("mouseleave", () => {
      hoverCount--;
      if (hoverCount === 0) {
        if (activeImg) activeImg.classList.remove("visible");
        activeImg = null;
        sakuraBox.classList.add("visible");
      }
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

  setTimeout(() => {
    sakuraBox.classList.add("visible");
  }, 400);
});
