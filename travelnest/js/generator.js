// ===== TRIP GENERATOR JS =====

// All destinations with type and budget tags
const tripData = [
  { name: "Bali, Indonesia", emoji: "🏝️", type: "relaxation", budget: "low",
    desc: "Tropical paradise with rice terraces, temples, and stunning beaches." },
  { name: "Tokyo, Japan", emoji: "🏯", type: "cultural", budget: "medium",
    desc: "A fascinating blend of ancient traditions and ultra-modern city life." },
  { name: "Patagonia, Argentina", emoji: "🏔️", type: "adventure", budget: "medium",
    desc: "Dramatic mountain landscapes, glaciers, and some of the world's best trekking." },
  { name: "Paris, France", emoji: "🗼", type: "cultural", budget: "high",
    desc: "The city of love, art, world-class cuisine, and iconic landmarks." },
  { name: "Costa Rica", emoji: "🌿", type: "nature", budget: "low",
    desc: "Lush rainforests, volcanoes, and incredible wildlife in Central America." },
  { name: "New Zealand", emoji: "🦅", type: "adventure", budget: "high",
    desc: "Epic landscapes from Lord of the Rings, perfect for outdoor adventures." },
  { name: "Maldives", emoji: "🐠", type: "relaxation", budget: "high",
    desc: "Pristine white sand beaches and crystal-clear waters in the Indian Ocean." },
  { name: "Morocco", emoji: "🕌", type: "cultural", budget: "low",
    desc: "Ancient medinas, colourful souks, and Sahara desert adventures." },
  { name: "Norway", emoji: "🌌", type: "nature", budget: "high",
    desc: "Stunning fjords, Northern Lights, and some of Europe's wildest landscapes." },
  { name: "Thailand", emoji: "🙏", type: "relaxation", budget: "low",
    desc: "Amazing food, beautiful temples, and incredible beaches at low prices." },
  { name: "Peru", emoji: "🦙", type: "adventure", budget: "medium",
    desc: "Home to Machu Picchu, the Amazon rainforest, and rich Inca history." },
  { name: "Kenya", emoji: "🦒", type: "nature", budget: "medium",
    desc: "World-famous safaris, the Maasai Mara, and incredible wildlife diversity." }
];

let lastResult = null;

// --- Generate a random trip ---
function generateTrip() {
  const travelType = document.getElementById('travel-type').value;
  const budgetRange = document.getElementById('budget-range').value;

  // Filter based on selections
  let filtered = tripData.filter(function (t) {
    const typeMatch = travelType === 'all' || t.type === travelType;
    const budgetMatch = budgetRange === 'all' || t.budget === budgetRange;
    return typeMatch && budgetMatch;
  });

  // If nothing matches, show all
  if (filtered.length === 0) {
    alert('No destinations match your filters. Showing a random pick instead!');
    filtered = tripData;
  }

  // Pick a random one
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const result = filtered[randomIndex];
  lastResult = result;

  showResult(result);
}

// --- Display the result ---
function showResult(dest) {
  document.getElementById('result-emoji').textContent = dest.emoji;
  document.getElementById('result-name').textContent = dest.name;
  document.getElementById('result-desc').textContent = dest.desc;
  document.getElementById('result-type-tag').textContent = '🏷️ ' + capitalise(dest.type);
  document.getElementById('result-budget-tag').textContent = '💰 ' + capitalise(dest.budget) + ' budget';

  const section = document.getElementById('result-section');
  section.style.display = 'block';

  // Spin the emoji for fun
  const emoji = document.getElementById('result-emoji');
  emoji.classList.add('spinning');
  setTimeout(function () {
    emoji.classList.remove('spinning');
  }, 500);

  // Scroll to result
  section.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Simple helper to capitalise first letter
function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- Render wishlist from localStorage ---
function renderWishlist() {
  const list = getWishlist();
  const container = document.getElementById('wishlist-list');

  if (list.length === 0) {
    container.innerHTML = '<p style="color:var(--grey);">Your wishlist is empty. Save some destinations!</p>';
    return;
  }

  container.innerHTML = '';
  list.forEach(function (item, index) {
    const div = document.createElement('div');
    div.className = 'wishlist-item';
    div.innerHTML = `
      <span>⭐ ${item}</span>
      <button onclick="removeFromWishlist(${index})" aria-label="Remove ${item}">✕</button>
    `;
    container.appendChild(div);
  });
}

// --- Remove one item from wishlist ---
function removeFromWishlist(index) {
  const list = getWishlist();
  list.splice(index, 1);
  saveWishlist(list);
  renderWishlist();
}

// --- Event listeners ---
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('generate-btn').addEventListener('click', generateTrip);

  document.getElementById('surprise-btn').addEventListener('click', generateTrip);

  document.getElementById('wishlist-btn').addEventListener('click', function () {
    if (lastResult) {
      addToWishlist(lastResult.name);
      renderWishlist();
    }
  });

  document.getElementById('clear-wishlist-btn').addEventListener('click', function () {
    if (confirm('Clear your entire wishlist?')) {
      saveWishlist([]);
      renderWishlist();
    }
  });

  renderWishlist();
});
