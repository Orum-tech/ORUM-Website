document.addEventListener("DOMContentLoaded", () => {
  





  // Feather Icons
  feather.replace();

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
    });
    
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
      });
    });
  }
  
  // --- Smooth Scrolling for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80; // Height of sticky nav
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });
  }

  // --- Fade-in on Scroll (Intersection Observer) ---
  const fadeInElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Check for custom delay
        const delay = parseInt(entry.target.dataset.delay) || 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        // Stop observing once visible
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  fadeInElements.forEach(el => {
    observer.observe(el);
  });
  
  // --- Contact Form Mailto Logic ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const msg = document.getElementById("message").value;
        
        const toEmail = "parakkerp@gmail.com"; 
        
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`;
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent("Contact from " + name)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form after a short delay
        setTimeout(() => {
            form.reset();
        }, 1000);
        
      } catch (error) {
        console.error("Failed to send email:", error);
        // Yahaan aap user ko ek error message dikha sakte hain (alert ki jagah)
      }
    });
  }
  
  // Set Footer Year
  document.getElementById('year').textContent = new Date().getFullYear();

});
