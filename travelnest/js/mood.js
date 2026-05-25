// ===== TRAVEL MOOD JS =====

// Destinations for the tracker
const trackerDestinations = [
  { name: "Paris, France", emoji: "🗼" },
  { name: "Tokyo, Japan", emoji: "🏯" },
  { name: "Bali, Indonesia", emoji: "🏝️" },
  { name: "New York, USA", emoji: "🗽" },
  { name: "Cape Town", emoji: "🦁" },
  { name: "Sydney, Australia", emoji: "🦘" },
  { name: "Rome, Italy", emoji: "🏛️" },
  { name: "Bangkok, Thailand", emoji: "🙏" }
];

// Audio objects (would need real .mp3 files)
const sounds = {
  beach: null,
  forest: null,
  city: null,
  rain: null
};

let activeSound = null;

// --- Handle sound toggle ---
function initSounds() {
  const buttons = document.querySelectorAll('.sound-btn');
  const status = document.getElementById('sound-status');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const soundName = btn.dataset.sound;

      // Turn off if already active
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        status.textContent = 'No sound playing';
        activeSound = null;
        // Real audio: sounds[soundName].pause();
        return;
      }

      // Remove active from all other buttons
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      status.textContent = `Now playing: ${btn.querySelector('span:last-child').textContent} 🎵`;
      activeSound = soundName;

      // Real audio implementation would be:
      // if (activeSound) sounds[activeSound].pause();
      // sounds[soundName].play();
    });
  });
}

// --- Load tracker state from localStorage ---
function getTrackerState() {
  return JSON.parse(localStorage.getItem('tracker_state') || '{}');
}

function saveTrackerState(state) {
  localStorage.setItem('tracker_state', JSON.stringify(state));
}

// --- Render the destination tracker ---
function renderTracker() {
  const container = document.getElementById('tracker-grid');
  const state = getTrackerState();
  container.innerHTML = '';

  trackerDestinations.forEach(function (dest) {
    const currentStatus = state[dest.name] || 'none';

    const card = document.createElement('div');
    card.className = 'tracker-card';
    card.innerHTML = `
      <span class="dest-emoji">${dest.emoji}</span>
      <h4>${dest.name}</h4>
      <div class="tracker-buttons">
        <button class="tracker-btn ${currentStatus === 'visited' ? 'visited' : ''}"
          onclick="setTrackerStatus('${dest.name}', 'visited')" aria-label="Mark as visited">
          ✅ Visited
        </button>
        <button class="tracker-btn ${currentStatus === 'planned' ? 'planned' : ''}"
          onclick="setTrackerStatus('${dest.name}', 'planned')" aria-label="Mark as planned">
          📅 Planned
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  updateStats(state);
}

// --- Set status for a destination ---
function setTrackerStatus(destName, status) {
  const state = getTrackerState();

  // Toggle off if same status clicked again
  if (state[destName] === status) {
    delete state[destName];
  } else {
    state[destName] = status;
  }

  saveTrackerState(state);
  renderTracker();
}

// --- Update stats numbers ---
function updateStats(state) {
  let visited = 0;
  let planned = 0;

  Object.values(state).forEach(function (s) {
    if (s === 'visited') visited++;
    if (s === 'planned') planned++;
  });

  document.getElementById('stat-visited').textContent = visited;
  document.getElementById('stat-planned').textContent = planned;
  document.getElementById('stat-wishlist').textContent = getWishlist().length;
}

// --- Reset tracker ---
function resetTracker() {
  if (confirm('Reset all tracking data?')) {
    localStorage.removeItem('tracker_state');
    renderTracker();
  }
}

// --- Event listeners ---
document.addEventListener('DOMContentLoaded', function () {
  initSounds();
  renderTracker();
  document.getElementById('reset-tracker-btn').addEventListener('click', resetTracker);
});
