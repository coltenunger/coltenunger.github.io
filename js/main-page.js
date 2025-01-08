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
  // REVEAL SCROLL INDICATOR AT BOTTOM
  // window.addEventListener("scroll", function () {
  //   const scrollIndicator = document.getElementById("scroll-indicator");

  //   // Check if the user has reached the bottom of the page
  //   if (
  //     window.scrollY + window.innerHeight >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     scrollIndicator.style.opacity = "1"; // Reveal the scroll indicator
  //   } else {
  //     scrollIndicator.style.opacity = "0"; // Keep it hidden
  //   }
  // });

  // SCROLL TO TOP ON "BACK TO TOP" CLICK
  document
    .getElementById("scroll-indicator")
    .addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling effect
      });
    });

  // TOGGLE NAV LINK STYLES BASED ON SECTION VISIBILITY.
  // Grab the Work link and Project nav links
  const workNavLink = document.getElementById("work-navlink");

  // Define the sections we care about (Welcome message and project sections)
  const welcomeMessage = document.getElementById("welcome-message");
  const projectSections = [
    {
      section: document.getElementById("project-1-card"),
      navLink: document.getElementById("project-1-navlink"),
    },
    {
      section: document.getElementById("project-2-card"),
      navLink: document.getElementById("project-2-navlink"),
    },
    {
      section: document.getElementById("project-3-card"),
      navLink: document.getElementById("project-3-navlink"),
    },
    {
      section: document.getElementById("project-4-card"),
      navLink: document.getElementById("project-4-navlink"),
    },
    {
      section: document.getElementById("project-5-card"),
      navLink: document.getElementById("project-5-navlink"),
    },
    {
      section: document.getElementById("project-6-card"),
      navLink: document.getElementById("project-6-navlink"),
    },
    {
      section: document.getElementById("project-7-card"),
      navLink: document.getElementById("project-7-navlink"),
    },
    {
      section: document.getElementById("project-8-card"),
      navLink: document.getElementById("project-8-navlink"),
    },
    {
      section: document.getElementById("project-9-card"),
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
});
