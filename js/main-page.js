Promise.all([
  // Load header & footer component content
  fetch("components/nav-header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("nav-header").innerHTML = data;
    }),

  fetch("components/nav-footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("nav-footer").innerHTML = data;
    }),
]).then(() => {
  // SCROLL TO TOP ON "BACK TO TOP" CLICK
  document
    .getElementById("scroll-indicator")
    .addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling effect
      });
    });

  // Store projects data globally
  let projectsData = [];

  // LOAD JSON CONTENT FOR BOTH DESKTOP CARDS AND MOBILE MODALS
  fetch("json/details.json")
    .then((response) => response.json())
    .then((details) => {
      projectsData = details; // Store the data globally

      // Populate all modal code blocks
      details.forEach((project, index) => {
        const projectNum = String(index + 1).padStart(2, "0");

        // Set content for modal code blocks
        const publishYearElement = document.getElementById(
          `publish-year-${projectNum}`
        );
        if (publishYearElement) {
          publishYearElement.textContent =
            project[`publish_year_${projectNum}`];
        }

        const categoryElement = document.getElementById(
          `category-${projectNum}`
        );

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

  // TOGGLE NAV LINK STYLES BASED ON SECTION VISIBILITY.
  // Grab the Work link and Project nav links
  const workNavLink = document.getElementById("work-navlink");

  // Define the sections we care about (Welcome message and project sections)
  const welcomeMessage = document.getElementById("welcome-message");
  const projectSections = [
    {
      section: document.getElementById("project01"),
      navLink: document.getElementById("project-1-navlink"),
    },
    {
      section: document.getElementById("project02"),
      navLink: document.getElementById("project-2-navlink"),
    },
    {
      section: document.getElementById("project03"),
      navLink: document.getElementById("project-3-navlink"),
    },
    {
      section: document.getElementById("project04"),
      navLink: document.getElementById("project-4-navlink"),
    },
    {
      section: document.getElementById("project05"),
      navLink: document.getElementById("project-5-navlink"),
    },
    {
      section: document.getElementById("project06"),
      navLink: document.getElementById("project-6-navlink"),
    },
    {
      section: document.getElementById("project07"),
      navLink: document.getElementById("project-7-navlink"),
    },
    {
      section: document.getElementById("project08"),
      navLink: document.getElementById("project-8-navlink"),
    },
    {
      section: document.getElementById("project09"),
      navLink: document.getElementById("project-9-navlink"),
    },
  ];

  // Function to toggle the strikethrough class on the Work nav link
  function toggleStrikethrough(isStruck) {
    if (isStruck) {
      workNavLink.classList.add("strikethrough");
    } else {
      workNavLink.classList.remove("strikethrough");
    }
  }

  // Function to toggle the underline class on the project nav links
  function toggleUnderline(sectionID) {
    // Remove strikethrough and add underline to the relevant nav link
    projectSections.forEach((project) => {
      const navLink = project.navLink;
      if (navLink) {
        if (project.section.id === sectionID) {
          navLink.classList.remove("strikethrough");
          navLink.classList.add("underline");
          navLink.classList.add("active-navlink");
        } else {
          navLink.classList.remove("underline");
          navLink.classList.add("strikethrough");
          navLink.classList.remove("active-navlink");
        }
      }
    });
  }

  // Function to reset all project nav links to strikethrough when welcome-message is in view
  function resetProjectNavLinks() {
    projectSections.forEach((project) => {
      const navLink = project.navLink;
      if (navLink) {
        navLink.classList.remove("underline");
        navLink.classList.add("strikethrough");
        navLink.classList.remove("active-navlink");
      }
    });
  }

  // Create an IntersectionObserver to detect when sections are in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the welcome-message section is in view, add strikethrough to Work link
          if (entry.target === welcomeMessage) {
            toggleStrikethrough(true);
            resetProjectNavLinks(); // Reset all project nav links to strikethrough
          } else if (
            projectSections.some((project) => project.section === entry.target)
          ) {
            // If any project section is in view, update the underline and strikethrough of nav links
            toggleStrikethrough(false);
            toggleUnderline(entry.target.id);
          }
        }
      });
    },
    {
      threshold: 0.6, // Trigger when 60% of the section is in view
    }
  );

  // Observe the relevant sections
  observer.observe(welcomeMessage);
  projectSections.forEach((project) => observer.observe(project.section));

  // MODAL HANDLING
  const modal = document.getElementById("mobile-modal");
  const moreInfoButtons = document.querySelectorAll(".more-info-button");
  const closeButton = document.getElementById("close-btn");

  // Function to update modal content
  function updateModalContent(projectNum) {
    const project = projectsData[parseInt(projectNum) - 1];

    document.getElementById("modal-publish-year-01").textContent =
      project[`publish_year_${projectNum}`];
    document.getElementById("modal-category-01").textContent =
      project[`category_${projectNum}`];
    document.getElementById("modal-description-01").textContent =
      project[`description_${projectNum}`];
  }

  // Show the modal when the "More Info" link is clicked
  moreInfoButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      // Get the project number from the parent section's ID
      const parentSection = button.closest("section");
      const projectNum = parentSection.id.replace("project", "");
      updateModalContent(projectNum);
      modal.style.display = "flex";
    });
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
