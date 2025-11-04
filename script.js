document.addEventListener("DOMContentLoaded", () => {
      
  // Initialize Feather Icons
  feather.replace();

  // Set Footer Year
  document.getElementById('year').textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mainElement = document.getElementById("main");

  // --- 1. Set Active Nav Link ---
  // Get the current page filename (e.g., "erp.html" or "index.html")
  const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';
  // Get the name before the ".html" (e.g., "erp" or "index")
  let pageName = currentPageFile.split('.')[0];
  if (pageName === 'index') {
      pageName = 'home'; // Treat 'index' as 'home'
  }
  
  const navLinks = document.querySelectorAll('[data-page]');
  
  navLinks.forEach(link => {
      const linkPage = link.dataset.page;
      if (linkPage === pageName) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });

  // --- 2. Mobile Menu Toggle ---
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
    });
    // Mobile menu links don't need to close the menu
    // since a new page is loading anyway.
  }

  // --- 3. Scroll to Top Button ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });
    
    // Scroll-to-top button ke click par smooth scroll
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Scroll to the top of the main content, not the <html> tag
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 4. Fade-in on Scroll ---
  // This logic works for elements as they appear on the page.
  const fadeInElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); 

  // Observe all elements on the page
  fadeInElements.forEach(el => {
    observer.observe(el);
  });
  
  // --- 5. Contact Form Mailto Logic ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value; 
        const phone = document.getElementById("phone").value;
        const msg = document.getElementById("message").value;
        
        const toEmail = "parakkerp@gmail.com"; 
        
        const body = `Name/School: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${msg}`;
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent("Inquiry from " + name)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        
        setTimeout(() => {
            form.reset();
        }, 1000);
        
      } catch (error) {
        console.error("Failed to process form:", error);
        // In a real app, use a custom modal for error messages
      }
    });
  }
});
