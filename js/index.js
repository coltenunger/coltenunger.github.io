async function renderProjects() {
  const projects = await loadJSON("json/details.json");
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

    const link = document.createElement("a");
    link.href = project.url;
    link.classList.add("project-link", "plain-link");
    link.dataset.slug = project.slug;

    link.innerHTML = `
      <span class="project-name">${project.name}</span>
      <span class="project-category">${project.category}</span>
      <span class="project-year">${project.year}</span>
    `;

    footer.appendChild(link);

    // pre-load the preview image, stacked and hidden by default
    const img = document.createElement("img");
    img.id = `preview-${project.slug}`;
    img.src = project.preview;
    img.alt = project.name;
    previewContainer.appendChild(img);
  });
}

async function init() {
  await Promise.all([
    loadComponent("components/nav-header.html", "nav-header"),
    renderProjects(),
  ]);

  setNavToggle("INFO", "/info.html");

  const links = document.querySelectorAll(".project-link");
  const sakura = document.getElementById("sakura-container");
  let activeImg = null;
  let hoverCount = 0;

  links.forEach((link) => {
    if (link.classList.contains("coming-soon")) return; // skip preview logic entirely if project has no photos

    link.addEventListener("mouseenter", () => {
      hoverCount++;
      if (hoverCount === 1) sakura.classList.remove("visible");

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
        sakura.classList.add("visible");
      }
    });
  });

  // dimming
  const footer = document.querySelector(".project-footer");
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

  setTimeout(() => sakura.classList.add("visible"), 400);
}

document.addEventListener("DOMContentLoaded", init);
