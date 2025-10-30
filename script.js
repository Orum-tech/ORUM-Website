document.addEventListener("DOMContentLoaded", () => {
  
  // --- Page Navigation Logic ---
  const navLinks = document.querySelectorAll(".nav-link");
  const logoLink = document.querySelector(".nav-logo");
  const pages = document.querySelectorAll(".page");
  const pricingButtons = document.querySelectorAll('a[data-page="contact"]');

  function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove("active");
    });

    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Update active state in nav
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-page") === pageId) {
        link.classList.add("active");
      }
    });

    // Special case for "Features" link
    if (pageId === "home-features") {
      document.querySelector('a[data-page="home"]').classList.add("active");
    }
    
    // Special case for pricing buttons leading to contact
    if (pageId === "contact") {
         document.querySelector('a[data-page="contact"]').classList.add("active");
    }

    // Scroll to top of page
    window.scrollTo(0, 0);
  }

  // Add listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let pageId = link.getAttribute("data-page");
      
      // Handle "Features" link
      if (pageId === "home-features") {
        showPage("page-home");
        // We show the home page, then scroll to features
        setTimeout(() => {
           document.getElementById("features").scrollIntoView({
             behavior: "smooth"
           });
        }, 100); // Small delay to ensure page is visible
      } else {
        showPage("page-" + pageId);
      }

      // Close mobile menu if open
      const navMenu = document.getElementById("navLinks");
      if (navMenu.classList.contains("mobile")) {
        navMenu.classList.remove("mobile");
      }
    });
  });

  // Add listener to logo
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage("page-home");
  });

  // Add listeners to pricing "Contact Sales" buttons
  pricingButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      showPage("page-contact");
    });
  });
  
  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("mobile");
  });
  
  // Add mobile-specific styles to CSS
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @media (max-width: 767px) {
      .nav-menu {
        display: none; /* Hide desktop menu */
      }
      
      .nav-menu.mobile {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 4.5rem; /* Navbar height */
        left: 0;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.03);
        padding: 1rem;
        gap: 0.5rem;
        animation: menuFadeIn 0.3s ease-out;
      }
      
      .nav-menu.mobile .nav-link {
        padding: 0.75rem 1rem;
      }
      
      .nav-menu.mobile .nav-link:hover {
        background-color: #f8f9fa;
      }
      
      @keyframes menuFadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }
  `;
  document.head.appendChild(styleSheet);


  // --- Fade-in Animation ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // --- Contact Form Mailto Logic ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const msg = document.getElementById("message").value;
      
      // Use the correct email address
      const toEmail = "parakkerp@gmail.com"; 
      
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      window.location.href = `mailto:${toEmail}?subject=Contact from ${name}&body=${body}`;
    });
  }

});
