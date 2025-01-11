  // Store projects data globally
  let projectsData = [];

  // LOAD JSON CONTENT FOR BOTH DESKTOP CARDS AND MOBILE MODALS
  fetch("json/details.json")
    .then((response) => response.json())
    .then((details) => {
      projectsData = details; // Store the data globally

      // Populate all desktop cards
      details.forEach((project, index) => {
        const projectNum = String(index + 1).padStart(2, '0');
        
        // Set content for desktop cards
        document.getElementById(`publish-year-${projectNum}`)?.textContent =
          project[`publish_year_${projectNum}`];
        document.getElementById(`category-${projectNum}`)?.textContent =
          project[`category_${projectNum}`];
        document.getElementById(`description-${projectNum}`)?.textContent =
          project[`description_${projectNum}`];
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
