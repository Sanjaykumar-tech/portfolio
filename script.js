/* ====================================================
   ENHANCED PORTFOLIO SCRIPT (Optimized)
==================================================== */

// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const themeSwitcher = document.getElementById('themeSwitcher');
const typeSpan = document.querySelector(".typewriter-text");

// Mobile Menu Functionality
function setupMobileMenu() {
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = !menuIcon.classList.contains('active');
    
    menuIcon.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // ARIA attributes
    menuIcon.setAttribute('aria-expanded', isActive);
    navbar.setAttribute('aria-hidden', !isActive);
  });

  // Close when clicking outside or on links
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') && 
        !e.target.closest('.navbar') && 
        !e.target.closest('#menu-icon')) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function closeMobileMenu() {
  menuIcon.classList.remove('active');
  navbar.classList.remove('active');
  document.body.classList.remove('no-scroll');
  menuIcon.setAttribute('aria-expanded', 'false');
  navbar.setAttribute('aria-hidden', 'true');
}

// Theme Toggle
function setupTheme() {
  function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') document.body.classList.add('light-mode');
  }

  themeSwitcher.addEventListener('click', toggleTheme);
  initTheme();
}

// Typing Animation
function initTypeEffect() {
  const text = ["Web Developer", "Frontend Developer", "Creative Coder", "Web Designer"];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = text[index];
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    typeSpan.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % text.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 60 : 120);
    }
  }
  type();
}

// Read More/Less
function setupReadMore() {
  document.querySelectorAll('[data-readmore]').forEach(container => {
    const btn = container.querySelector('.read-more-btn');
    const content = container.querySelector('.more-text');
    const dots = container.querySelector('#dots');

    btn.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');

    btn.addEventListener('click', () => {
      const isExpanding = !content.classList.contains('show');
      
      if (isExpanding) {
        content.style.setProperty('--dynamic-height', 
          `${content.scrollHeight}px`);
      }
      
      content.classList.toggle('show');
      const isVisible = content.classList.contains('show');
      
      btn.setAttribute('aria-expanded', isVisible);
      btn.textContent = isVisible ? 'Read Less' : 'Read More';
      if (dots) dots.style.display = isVisible ? 'none' : 'inline';
      content.setAttribute('aria-hidden', !isVisible);
      content.tabIndex = isVisible ? 0 : -1;
    });
  });
}

// Scroll Animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-box, .project-card, .about-img, .home-img')
    .forEach(el => observer.observe(el));
}

// Contact Form
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('input[type="submit"]');
    
    try {
      submitBtn.disabled = true;
      submitBtn.value = "Sending...";
      
      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        phone: form.phone?.value.trim(),
        subject: form.subject?.value.trim()
      };

      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      const res = await fetch("https://portfolio-backend-1-72na.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to send message");
      window.location.href = "thank-you.html";
      
    } catch (err) {
      alert(err.message);
      submitBtn.disabled = false;
      submitBtn.value = "Send Message";
    }
  });
}

// CV Download Tracking
function setupCVDownload() {
  const cvBtn = document.querySelector('a[href*="CV.pdf"]');
  if (!cvBtn) return;

  cvBtn.addEventListener('click', (e) => {
    // Desktop - let browser handle download
    if (window.innerWidth > 768) return;
    
    // Mobile fallback
    e.preventDefault();
    const link = document.createElement('a');
    link.href = cvBtn.href;
    link.download = cvBtn.download || 'Sanjaykumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Analytics
    console.log('CV downloaded'); // Can replace with actual analytics
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", setupCVDownload);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupTheme();
  initTypeEffect();
  setupReadMore();
  setupScrollAnimations();
  setupContactForm();
});