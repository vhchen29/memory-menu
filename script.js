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

  const memory = {
    food: document.getElementById('foodInput').value,
    date: document.getElementById('foodDate').value,
    people: document.getElementById('foodPeople').value,
    location: document.getElementById('foodLocation').value,
    blurb: document.getElementById('foodBlurb').value
  };

  addFoodLabel(memory);
  foodForm.reset();
});


function addFoodLabel(memory) {
  const label = document.createElement('div');
  label.className = 'food-label';
  label.textContent = memory.food;

  // attach memory data to the label for later use
  label.dataset.food = memory.food;
  label.dataset.date = memory.date;
  label.dataset.people = memory.people;
  label.dataset.location = memory.location;
  label.dataset.blurb = memory.blurb;

  // randomish position
  const x = Math.random() * 80 + 10; // %
  const y = Math.random() * 80 + 10; // %

  label.style.left = x + '%';
  label.style.top = y + '%';

  memoryMap.appendChild(label);

  // add hover behavior
  label.addEventListener('mouseenter', showTooltip);
  label.addEventListener('mouseleave', hideTooltip);
}

const tooltip = document.getElementById('tooltip');

function showTooltip(e) {

  const label = e.target;
  const rect = label.getBoundingClientRect();

  tooltip.innerHTML = "HELLO";  // basic test

  tooltip.style.left = rect.right + 10 + 'px';
  tooltip.style.top = rect.top + 'px';
  tooltip.style.display = 'block';
  // const label = e.target;

  // tooltip.innerHTML = `
  //   <div style="font-size:1.1rem; font-weight:bold; margin-bottom:6px;">
  //   ${label.dataset.food}
  //   </div>
  //   <div><strong>Date:</strong> ${label.dataset.date}</div>
  //   <div><strong>People:</strong> ${label.dataset.people}</div>
  //   <div><strong>Location:</strong> ${label.dataset.location}</div>
  //   <div style="margin-top:8px;">${label.dataset.blurb}</div>
  // `;

  // tooltip.style.left = (label.offsetLeft + 30) + 'px';
  // tooltip.style.top = (label.offsetTop + 30) + 'px';
  // tooltip.style.display = 'block';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}