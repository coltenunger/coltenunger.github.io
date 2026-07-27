// Helper to load HTML components
async function loadComponent(path, targetId) {
  const response = await fetch(path);
  const html = await response.text();
  document.getElementById(targetId).innerHTML = html;
}

// Helper to load JSON data
async function loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}

// Helper to set nav toggle state
function setNavToggle(text, href) {
  const toggle = document.getElementById("nav-toggle");
  toggle.textContent = text;
  toggle.href = href;
}
