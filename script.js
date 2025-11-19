function showPage(pageName) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.style.display = 'none');

  document.getElementById('page-' + pageName).style.display = 'block';
}

// --- Adding Foods to the Memory Map ---

const foodForm = document.getElementById('foodForm');
const memoryMap = document.getElementById('memory-map');

foodForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const food = document.getElementById('foodInput').value;
  addFoodLabel(food);

  document.getElementById('foodInput').value = '';
});


function addFoodLabel(text) {
  const label = document.createElement('div');
  label.className = 'food-label';
  label.textContent = text;

  // randomish position
  const x = Math.random() * 80 + 10; // %
  const y = Math.random() * 80 + 10; // %

  label.style.left = x + '%';
  label.style.top = y + '%';

  memoryMap.appendChild(label);
}