
function getBudgetStatus(dailyBudget) {
  if (dailyBudget < 5000) {
    return { label: " Low Budget", color: "#27ae60", progress: 25 };
  } else if (dailyBudget < 15000) {
    return { label: " Moderate", color: "#f39c12", progress: 60 };
  } else {
    return { label: " Luxury", color: "#e74c3c", progress: 95 };
  }
}


function calculateBudget() {
  const dest = document.getElementById('destination').value.trim();
  const days = parseInt(document.getElementById('days').value);
  const daily = parseInt(document.getElementById('daily-budget').value);

  document.getElementById('dest-error').textContent = '';
  document.getElementById('days-error').textContent = '';
  document.getElementById('budget-error').textContent = '';

 
  let valid = true;

  if (!dest) {
    document.getElementById('dest-error').textContent = 'Please enter a destination.';
    valid = false;
  }

  if (!days || days < 1) {
    document.getElementById('days-error').textContent = 'Please enter a valid number of days.';
    valid = false;
  }

  if (!daily || daily < 1) {
    document.getElementById('budget-error').textContent = 'Please enter a valid daily budget.';
    valid = false;
  }

  if (!valid) return;


  const total = days * daily;
  const status = getBudgetStatus(daily);


  document.getElementById('result-dest').textContent = dest;
  document.getElementById('result-days').textContent = days + ' days';
  document.getElementById('result-daily').textContent = 'LKR ' + daily + '/day';
  document.getElementById('result-total').textContent = 'LKR ' + total;
  document.getElementById('result-status').textContent = status.label;
  document.getElementById('result-status').style.color = status.color;
  document.getElementById('progress-label').textContent = status.label;

  // Animate progress bar
  const bar = document.getElementById('progress-bar');
  bar.style.backgroundColor = status.color;
  bar.style.width = '0%'; // Reset first

  setTimeout(function () {
    bar.style.width = status.progress + '%';
  }, 100);

  // Show results section with animation
  const resultsSection = document.getElementById('results-section');
  resultsSection.style.display = 'block';
  resultsSection.classList.add('fade-in');

  // Store current budget for saving
  window.currentBudget = { dest, days, daily, total, status: status.label };
}

// --- Save budget to localStorage ---
function saveBudget() {
  if (!window.currentBudget) return;

  const budgets = JSON.parse(localStorage.getItem('saved_budgets') || '[]');
  budgets.push(window.currentBudget);
  localStorage.setItem('saved_budgets', JSON.stringify(budgets));

  alert('Budget saved! 💾');
  renderSavedBudgets();
}

// --- Load and display saved budgets ---
function renderSavedBudgets() {
  const budgets = JSON.parse(localStorage.getItem('saved_budgets') || '[]');
  const list = document.getElementById('saved-list');

  if (budgets.length === 0) {
    list.innerHTML = '<p style="color:var(--grey);">No saved budgets yet.</p>';
    return;
  }

  list.innerHTML = '';
  budgets.forEach(function (b) {
    const div = document.createElement('div');
    div.className = 'saved-item';
    div.innerHTML = `
      <span>${b.dest} — ${b.days} days @ LKR ${b.daily}/day</span>
      <span class="saved-total">LKR ${b.total} (${b.status})</span>
    `;
    list.appendChild(div);
  });
}

// --- Clear all saved budgets ---
function clearBudgets() {
  if (confirm('Are you sure you want to clear all saved budgets?')) {
    localStorage.removeItem('saved_budgets');
    renderSavedBudgets();
  }
}

// --- Event listeners ---
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculate-btn').addEventListener('click', calculateBudget);
  document.getElementById('save-budget-btn').addEventListener('click', saveBudget);
  document.getElementById('clear-budgets-btn').addEventListener('click', clearBudgets);

  renderSavedBudgets();
});
