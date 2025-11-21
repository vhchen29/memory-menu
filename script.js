function showPage(pageName) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.style.display = 'none');

  document.getElementById('page-' + pageName).style.display = 'block';
}

// --- Adding Foods to the Memory Map ---
// const label = document.createElement('div');
const foodForm = document.getElementById('foodForm');
const memoryMap = document.getElementById('memory-map');
const dictForm = document.getElementById("dictForm");
const dictionary = {};

sampleMemories.forEach(m => addFoodLabel(m));

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
  console.log("addFoodLabel CALLED with:", memory);

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

  // tooltip.innerHTML = "HELLO";  // basic test

  
  // const label = e.target;

  tooltip.innerHTML = `
    <div style="font-size:1.1rem; font-weight:bold; margin-bottom:6px;">
   ${label.dataset.foodChinese || label.dataset.food}
    </div>
    <div><strong>When?</strong> ${label.dataset.date}</div>
    <div><strong>People:</strong> ${label.dataset.people}</div>
    <div><strong>Where:</strong> ${label.dataset.location}</div>
    <div style="margin-top:8px;">${label.dataset.blurb}</div>
  `;

  tooltip.style.left = rect.right + 10 + 'px';
  tooltip.style.top = rect.top + 'px';
  tooltip.style.display = 'block';

    updateLabelsWithDictionary();

}

function hideTooltip() {
  tooltip.style.display = 'none';
}

function isChinese(text) {
  return /^[\u4e00-\u9fff]+$/.test(text);
}


dictForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const chinese = document.getElementById("dictChinese").value.trim();
  const english = document.getElementById("dictEnglish").value.trim().toLowerCase();

  if (!isChinese(chinese)) {
    alert("Please enter only Chinese characters.");
    return;
  }

  dictionary[english] = chinese;
  updateLabelsWithDictionary();
  updateDictList();

  dictForm.reset();
});


function updateDictList() {
  const list = document.getElementById("dictList");
  list.innerHTML = "";

  for (const english in dictionary) {
    const chinese = dictionary[english];
    const li = document.createElement("li"); //list item
    li.textContent = `${english} → ${chinese}`;
    list.appendChild(li);
  }
}

function updateLabelsWithDictionary() {
  const original = label.dataset.food;
    const words = original.split(/\s+/); // split by spaces

    const updatedWords = words.map(w => {
      const key = w.toLowerCase();
      return dictionary[key] || w;
    });

    const updated = updatedWords.join(" ");

    // update visible text
    label.textContent = updated;

    // update Chinese version for tooltip (optional)
    label.dataset.foodChinese = updated;
  }
  