// ===== FEEDBACK PAGE JS =====

// FAQ data
const faqData = [
  {
    q: "Is TravelNest free to use?",
    a: "Yes! TravelNest is completely free. All features including the budget planner, trip generator, and destination tracker are available at no cost."
  },
  {
    q: "Where is my data stored?",
    a: "All your data (saved budgets, wishlist, visited destinations) is stored in your browser's localStorage. It stays on your device and is never sent to a server."
  },
  {
    q: "Can I use TravelNest on my phone?",
    a: "Absolutely! TravelNest is fully responsive and works on mobile, tablet, and desktop. It also works as a Progressive Web App (PWA) so you can add it to your home screen."
  },
  {
    q: "How does the Destination of the Day work?",
    a: "The Destination of the Day is picked automatically based on the current date. It changes every day, so check back daily for a new featured destination!"
  },
  {
    q: "How do I add a destination to my wishlist?",
    a: "You can add destinations from the Destinations page (click a card, then 'Add to Wishlist') or from the Trip Generator page after generating a suggestion."
  },
  {
    q: "Can I clear my saved data?",
    a: "Yes! On the Budget Planner page you can clear saved budgets, on the Trip Generator you can clear your wishlist, and on the Travel Mood page you can reset your tracker."
  }
];

// --- Render FAQ accordion ---
function renderFAQ() {
  const container = document.getElementById('faq-container');

  faqData.forEach(function (item, index) {
    const div = document.createElement('div');
    div.className = 'accordion-item';
    div.innerHTML = `
      <button class="accordion-header" id="faq-btn-${index}" aria-expanded="false">
        ${item.q}
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body" id="faq-body-${index}">
        <p>${item.a}</p>
      </div>
    `;
    container.appendChild(div);

    // Toggle on click
    const btn = div.querySelector('.accordion-header');
    const body = div.querySelector('.accordion-body');

    btn.addEventListener('click', function () {
      const isOpen = btn.classList.contains('open');

      // Close all others first
      document.querySelectorAll('.accordion-header').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));

      // Open this one if it was closed
      if (!isOpen) {
        btn.classList.add('open');
        body.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// --- Validate and submit feedback form ---
function submitFeedback() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear previous errors
  document.getElementById('name-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('message-error').textContent = '';

  let valid = true;

  if (!name || name.length < 2) {
    document.getElementById('name-error').textContent = 'Please enter your name (at least 2 characters).';
    valid = false;
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (!message || message.length < 10) {
    document.getElementById('message-error').textContent = 'Please enter a message (at least 10 characters).';
    valid = false;
  }

  if (!valid) return;

  // Save feedback to localStorage
  const feedback = { name, email, message, date: new Date().toLocaleDateString() };
  const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
  allFeedback.push(feedback);
  localStorage.setItem('feedback', JSON.stringify(allFeedback));

  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';

  // Show success message
  showMessage('form-message', '✅ Thank you, ' + name + '! Your message has been received.', true);
}

// --- Event listeners ---
document.addEventListener('DOMContentLoaded', function () {
  renderFAQ();
  document.getElementById('submit-btn').addEventListener('click', submitFeedback);
});
