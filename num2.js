// Store projects data globally
let projectsData = [];

// LOAD JSON CONTENT FOR BOTH DESKTOP CARDS AND MOBILE MODALS
fetch("json/details.json")
  .then((response) => response.json())
  .then((details) => {
    projectsData = details; // Store the data globally

    // Populate all desktop cards
    details.forEach((project, index) => {
      const projectNum = String(index + 1).padStart(2, "0");

      // Set content for desktop cards
      const publishYearElement = document.getElementById(
        `publish-year-${projectNum}`
      );
      if (publishYearElement) {
        publishYearElement.textContent = project[`publish_year_${projectNum}`];
      }
      const categoryElement = document.getElementById(`category-${projectNum}`);
      if (categoryElement) {
        categoryElement.textContent = project[`category_${projectNum}`];
      }
      const descriptionElement = document.getElementById(
        `description-${projectNum}`
      );
      if (descriptionElement) {
        descriptionElement.textContent = project[`description_${projectNum}`];
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
