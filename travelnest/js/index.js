
const quotes = [
  "Explore the World ✈️",
  "Adventure Awaits You 🏔️",
  "Collect Moments, Not Things 📷",
  "Travel Far, Travel Wide 🌏",
  "Every Journey Begins Here 🗺️"
];

// Destination of the Day is selected from shared destination data

let quoteIndex = 0;

function rotateQuote() {
  const quoteEl = document.getElementById('hero-quote');
  if (!quoteEl) return;

 
  quoteEl.style.opacity = '0';

  setTimeout(function () {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteEl.textContent = quotes[quoteIndex];
    quoteEl.style.opacity = '1';
  }, 500);
}


setInterval(rotateQuote, 3000);


function setDestinationOfTheDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const index = dayOfYear % destinationData.length;
  const dest = destinationData[index];

  const dotdImage = document.getElementById('dotd-image');
  if (dotdImage) {
    dotdImage.src = dest.image;
    dotdImage.alt = `${dest.name} photo`;
  }
  document.getElementById('dotd-name').textContent = dest.name;
  document.getElementById('dotd-desc').textContent = dest.desc;
}


document.addEventListener('DOMContentLoaded', function () {
  setDestinationOfTheDay();
});
