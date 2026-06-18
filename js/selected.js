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

  for (let i = 1; i <= project.photoCount; i++) {
    const img = document.createElement("img");
    img.src = `/assets/images/selected_works/${project.slug}/${i}.jpg`;
    img.loading = "lazy";
    if (i === 1) img.classList.add("active"); // show first image by default
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

  // clicking left side goes to previous image (wraps around)
  document.getElementById("prev-zone").addEventListener("click", () => {
    goTo((current - 1 + images.length) % images.length);
  });

  // clicking right side goes to next image (wraps around)
  document.getElementById("next-zone").addEventListener("click", () => {
    goTo((current + 1) % images.length);
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
