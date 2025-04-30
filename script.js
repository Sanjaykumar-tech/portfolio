/* ====================================================
   SECTION 1: Mobile Navbar Toggle
==================================================== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');   // Toggle icon shape
  navbar.classList.toggle('active');   // Toggle nav menu visibility
};


/* ====================================================
   SECTION 2: Theme Toggle (Dark / Light Mode)
==================================================== */
const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("i");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  

  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");  // Switch to sun icon
  } else {
    icon.classList.replace("fa-sun", "fa-moon");  // Switch to moon icon
  }
});


/* ====================================================
   SECTION 3: Typing Animation for Role
==================================================== */
const text = ["Web Developer", "Frontend Developer", "Creative Coder", "Web Designer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpan = document.querySelector(".typewriter-text");

function typeEffect() {
  const currentText = text[index];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typeSpan.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500); // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % text.length;
    setTimeout(typeEffect, 500); // Pause before next word
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : 120);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect(); // Start typing effect on load
});


  function toggleReadMore() {
    const fullText = document.getElementById("full-text");
    const dots = document.getElementById("dots");
    const btn = document.getElementById("readBtn");

    if (fullText.style.display === "none") {
      fullText.style.display = "block";
      dots.style.display = "none";
      btn.textContent = "Show Less";
    } else {
      fullText.style.display = "none";
      dots.style.display = "inline";
      btn.textContent = "Read More";
    }
  }

  // Optional: Set default view when page loads
  window.onload = () => {
    document.getElementById("full-text").style.display = "none";
  };

  const navLinks = document.querySelectorAll('.nav-link');
const menu = document.querySelector('.menu-icon');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    document.querySelector('nav ul').classList.remove('show');
  });
});


  document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      subject: this.subject.value,
      message: this.message.value
    };

    try {
      const res = await fetch("https://portfolio-backend-1-72na.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        this.reset(); // clear form
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    }
  });

