// ===== GLOBAL JS - TravelNest =====
// Reusable functions shared across all pages

// --- Hamburger menu toggle ---
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Highlight active page link
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
}

// --- Scroll reveal animation ---
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// --- Footer newsletter form ---
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // Save to localStorage
    let emails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    if (!emails.includes(email)) {
      emails.push(email);
      localStorage.setItem('newsletter_emails', JSON.stringify(emails));
    }

    emailInput.value = '';
    alert('Thanks for subscribing! 🎉');
  });
}

// --- Show a simple toast/message ---
function showMessage(containerId, message, isSuccess = true) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.textContent = message;
  container.className = isSuccess ? 'success-msg' : 'error-msg';
  container.style.display = 'block';

  // Auto-hide after 4 seconds
  setTimeout(() => {
    container.style.display = 'none';
  }, 4000);
}

// --- Get wishlist from localStorage ---
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

// --- Save wishlist to localStorage ---
function saveWishlist(list) {
  localStorage.setItem('wishlist', JSON.stringify(list));
}

// --- Add destination to wishlist ---
function addToWishlist(destName) {
  const list = getWishlist();
  if (!list.includes(destName)) {
    list.push(destName);
    saveWishlist(list);
    alert(`${destName} added to your wishlist! ⭐`);
  } else {
    alert(`${destName} is already in your wishlist.`);
  }
}

// --- Run on every page load ---
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initScrollReveal();
  initNewsletter();
});
