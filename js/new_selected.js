async function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("selected");

  const projects = await loadJSON("/json/details.json");
  const project = projects.find((p) => p.slug === slug);

  if (!project) return;

  document.title = project.name;

  // Build slideshow
  const slideshow = document.createElement("div");
  slideshow.className = "slideshow";

  const format = project.photoFormat || "jpg";
  for (let i = 1; i <= project.photoCount; i++) {
    const img = document.createElement("img");
    img.src = `/assets/images/selected_works/${project.slug}/${i}.${format}`;
    img.loading = "lazy";
    if (i === 1) img.classList.add("active");
    slideshow.appendChild(img);
  }

  document
    .getElementById("slideshow")
    .insertBefore(slideshow, document.getElementById("next-zone"));

  // Build project details
  const creditHTML = project.credit
    ? `<div class="detail"><span>${project.credit} <a href="${project.creditUrl}" target="_blank" class="credit-link plain-link">${project.creditName}</a></span></div>`
    : "";

  const details = document.querySelector(".project-details");
  details.innerHTML = `
    <div class="detail"><span>${project.name}</span></div>
    <div class="detail"><span>${project.year}</span><span>${project.location}</span></div>
    <div class="detail"><span>${project.services.join("\n")}</span></div>
    ${creditHTML}
    <div class="detail"><span class="description">${project.desc}</span></div>
  `;

  if (project.descWidth) {
    details.querySelector(".description").style.width = project.descWidth;
  }

  // Slideshow navigation
  const images = slideshow.querySelectorAll("img");
  const cursorLabel = document.getElementById("cursor-label");
  let current = 0;

  function updateLabel() {
    const currentNum = String(current + 1).padStart(2, "0");
    const totalNum = String(images.length).padStart(2, "0");
    cursorLabel.textContent = `${currentNum}\u00A0 / \u00A0${totalNum}`;
  }

  function goTo(index) {
    images[current].classList.remove("active");
    current = index;
    images[current].classList.add("active");
    updateLabel();
  }

  const prevZone = document.getElementById("prev-zone");
  const nextZone = document.getElementById("next-zone");

  updateLabel();

  document.addEventListener("mousemove", (e) => {
    cursorLabel.style.left = e.clientX + "px";
    cursorLabel.style.top = e.clientY + "px";
  });

  [prevZone, nextZone].forEach((zone) => {
    zone.addEventListener("mouseenter", () =>
      cursorLabel.classList.add("visible"),
    );
    zone.addEventListener("mouseleave", () =>
      cursorLabel.classList.remove("visible"),
    );
  });

  prevZone.addEventListener("click", () => {
    goTo((current - 1 + images.length) % images.length);
  });

  nextZone.addEventListener("click", () => {
    goTo((current + 1) % images.length);
  });
}

async function init() {
  await Promise.all([
    loadComponent("/components/nav-header.html", "nav-header"),
    loadProject(),
  ]);

  setNavToggle("INFO", "/info.html");
}

document.addEventListener("DOMContentLoaded", init);
