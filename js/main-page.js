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

  // LOAD JSON CONTENT
  fetch("json/details.json")
    .then((response) => response.json())
    .then((details) => {
      const project01 = details[0];
      const project02 = details[1];
      const project03 = details[2];
      const project04 = details[3];
      const project05 = details[4];
      const project06 = details[5];
      const project07 = details[6];
      const project08 = details[7];
      const project09 = details[8];

      document.getElementById("publish-year-01").textContent =
        project01.publish_year_01;
      document.getElementById("category-01").textContent =
        project01.category_01;
      document.getElementById("description-01").textContent =
        project01.description_01;

      document.getElementById("publish-year-02").textContent =
        project02.publish_year_02;
      document.getElementById("category-02").textContent =
        project02.category_02;
      document.getElementById("description-02").textContent =
        project02.description_02;

      document.getElementById("publish-year-03").textContent =
        project03.publish_year_03;
      document.getElementById("category-03").textContent =
        project03.category_03;
      document.getElementById("description-03").textContent =
        project03.description_03;

      document.getElementById("publish-year-04").textContent =
        project04.publish_year_04;
      document.getElementById("category-04").textContent =
        project04.category_04;
      document.getElementById("description-04").textContent =
        project04.description_04;

      document.getElementById("publish-year-05").textContent =
        project05.publish_year_05;
      document.getElementById("category-05").textContent =
        project05.category_05;
      document.getElementById("description-05").textContent =
        project05.description_05;

      document.getElementById("publish-year-06").textContent =
        project06.publish_year_06;
      document.getElementById("category-06").textContent =
        project06.category_06;
      document.getElementById("description-06").textContent =
        project06.description_06;

      document.getElementById("publish-year-07").textContent =
        project07.publish_year_07;
      document.getElementById("category-07").textContent =
        project07.category_07;
      document.getElementById("description-07").textContent =
        project07.description_07;

      document.getElementById("publish-year-08").textContent =
        project08.publish_year_08;
      document.getElementById("category-08").textContent =
        project08.category_08;
      document.getElementById("description-08").textContent =
        project08.description_08;

      document.getElementById("publish-year-09").textContent =
        project09.publish_year_09;
      document.getElementById("category-09").textContent =
        project09.category_09;
      document.getElementById("description-09").textContent =
        project09.description_09;
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

  //

  // MODAL HANDELING
  const modal = document.getElementById("mobile-modal");
  const moreInfo = document.getElementById("more-info-btn");
  const closeButton = document.getElementById("close-btn");

  // Show the modal when the "More Info" link is clicked
  moreInfo.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    modal.style.display = "flex"; // Display the modal
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Hide the modal
    }
  });
});
