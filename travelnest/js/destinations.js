
// destinationData is loaded from js/destination-data.js in the page head

let selectedDest = null;


function renderCards(data) {
  const container = document.getElementById('cards-container');
  const noResults = document.getElementById('no-results');
  container.innerHTML = '';

  if (data.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  data.forEach(function (dest) {
    const card = document.createElement('div');
    card.className = 'dest-card reveal';
    card.innerHTML = `
      <div class="dest-card-image">
        <img src="${dest.image}" alt="${dest.name} photo" />
      </div>
      <div class="dest-card-body">
        <span class="continent-tag">${dest.continent}</span>
        <h3>${dest.name}, ${dest.country}</h3>
        <p>${dest.desc.substring(0, 80)}...</p>
      </div>
    `;
    card.addEventListener('click', function () {
      openModal(dest);
    });
    container.appendChild(card);
  });

 
  initScrollReveal();
}


function filterDestinations() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const continent = document.getElementById('continent-filter').value;

  const filtered = destinationData.filter(function (dest) {
    const matchSearch = dest.name.toLowerCase().includes(search) || dest.country.toLowerCase().includes(search);
    const matchContinent = continent === 'all' || dest.continent === continent;
    return matchSearch && matchContinent;
  });

  renderCards(filtered);
}

function openModal(dest) {
  selectedDest = dest;

  document.getElementById('modal-title').textContent = `${dest.name}, ${dest.country}`;

  let modalImage = document.getElementById('modal-image');
  if (!modalImage) {
    modalImage = document.createElement('img');
    modalImage.id = 'modal-image';
    modalImage.className = 'modal-image';
    const modalBox = document.querySelector('#modal .modal-box');
    const descElement = document.getElementById('modal-desc');
    modalBox.insertBefore(modalImage, descElement);
  }
  modalImage.src = dest.image;
  modalImage.alt = `${dest.name} photo`;

  document.getElementById('modal-desc').textContent = dest.desc;

  
  const ul = document.getElementById('modal-attractions');
  ul.innerHTML = '';
  dest.attractions.forEach(function (a) {
    const li = document.createElement('li');
    li.textContent = a;
    ul.appendChild(li);
  });

  
  const tbody = document.getElementById('modal-table-body');
  tbody.innerHTML = '';
  dest.costs.forEach(function (row) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.category}</td><td>LKR ${row.budget}</td><td>LKR ${row.mid}</td><td>LKR ${row.luxury}</td>`;
    tbody.appendChild(tr);
  });

  document.getElementById('modal').classList.add('active');
}


function closeModal() {
  document.getElementById('modal').classList.remove('active');
}


document.addEventListener('DOMContentLoaded', function () {
  renderCards(destinationData);

  document.getElementById('search-input').addEventListener('input', filterDestinations);
  document.getElementById('continent-filter').addEventListener('change', filterDestinations);
  document.getElementById('modal-close').addEventListener('click', closeModal);

  
  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });

  
  document.getElementById('modal-wishlist').addEventListener('click', function () {
    if (selectedDest) {
      addToWishlist(selectedDest.name + ', ' + selectedDest.country);
    }
  });
});
