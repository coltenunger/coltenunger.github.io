async function loadSelected() {
  // get the project slug from the URL e.g. ?selected=mister-tiger
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("selected");

  // fetch all projects from JSON and find the matching one
  const response = await fetch("/json/details.json");
  const projects = await response.json();
  const project = projects.find((p) => p.slug === slug);

  // if no match found, stop
  if (!project) return;

  // set the browser tab title to the project name
  document.title = project.name;

  // build the slideshow div and populate with images
  const slideshow = document.createElement("div");
  slideshow.classList.add("slideshow");

  const format = project.photoFormat || "jpg";

  for (let i = 1; i <= project.photoCount; i++) {
    const img = document.createElement("img");
    img.src = `/assets/images/selected_works/${project.slug}/${i}.${format}`;
    img.loading = "lazy";
    if (i === 1) img.classList.add("active");
    slideshow.appendChild(img);
  }

  // insert slideshow between the prev and next click zones
  document
    .getElementById("slideshow")
    .insertBefore(slideshow, document.getElementById("next-zone"));

  // conditionally render credit div — omit entirely if credit is empty
  const creditHTML = project.credit
    ? `<div class="detail"><span>${project.credit} <a href="${project.creditUrl}" target="_blank" class="credit-name unstyle-link">${project.creditName}</a></span></div>`
    : "";

  // build and inject project details into the footer
  const details = document.querySelector(".project-details");
  details.innerHTML = `
    <div class="detail"><span>${project.name}</span></div>
    <div class="detail"><span>${project.year}</span><span>${project.location}</span></div>
    <div class="detail"><span>${project.services.join("\n")}</span></div>
    ${creditHTML}
    <div class="detail"><span class="description">${project.desc}</span></div>
  `;

  // apply custom description width if specified in JSON
  const descSpan = details.querySelector(".description");
  if (project.descWidth) descSpan.style.width = project.descWidth;

  // slideshow pagination logic
  const images = slideshow.querySelectorAll("img");
  let current = 0;

  function goTo(index) {
    images[current].classList.remove("active"); // fade out current
    current = index;
    images[current].classList.add("active"); // fade in next
  }

  const prevZone = document.getElementById("prev-zone");
  const nextZone = document.getElementById("next-zone");

  // cursor label showing current image position
  const cursorLabel = document.getElementById("cursor-label");
  const total = images.length;

  function updateCursorLabel() {
    const currentNum = String(current + 1).padStart(2, "0");
    const totalNum = String(total).padStart(2, "0");
    cursorLabel.textContent = `${currentNum}\u00A0 / \u00A0${totalNum}`;
  }

  updateCursorLabel();

  document.addEventListener("mousemove", (e) => {
    cursorLabel.style.left = e.clientX + "px";
    cursorLabel.style.top = e.clientY + "px";
  });

  [prevZone, nextZone].forEach((zone) => {
    zone.addEventListener("mouseenter", () => {
      cursorLabel.classList.add("visible");
    });
    zone.addEventListener("mouseleave", () => {
      cursorLabel.classList.remove("visible");
    });
  });

  // clicking left side goes to previous image (wraps around)
  prevZone.addEventListener("click", () => {
    goTo((current - 1 + images.length) % images.length);
    updateCursorLabel();
  });

  // clicking right side goes to next image (wraps around)
  nextZone.addEventListener("click", () => {
    goTo((current + 1) % images.length);
    updateCursorLabel();
  });
}

Promise.all([
  // load nav component
  fetch("/components/nav-header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("nav-header").innerHTML = data;
    }),
  // load project data
  loadSelected(),
]).then(() => {
  // set nav toggle button to link back to info page
  const navToggle = document.getElementById("nav-toggle");
  navToggle.textContent = "info";
  navToggle.href = "/info.html";
});
