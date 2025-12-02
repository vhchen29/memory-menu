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

function floatLabel(label) {
  function move() {
    const box = memoryMap.getBoundingClientRect();
    const rect = label.getBoundingClientRect();

    const w = label.offsetWidth;
    const h = label.offsetHeight;

    const currentX = parseFloat(label.dataset.x);
    const currentY = parseFloat(label.dataset.y);

    // const currentX = label.style.left - box.left;
    // const currentY = label.style.top - box.top;

    const randX = currentX + (Math.random() * 200 - 100);
    const randY = currentY + (Math.random() * 200 - 100);

    const x = Math.min(Math.max(randX, 0), box.width - w);
    const y = Math.min(Math.max(randY, 0), box.height - h);

    // const x = (Math.random() * 80 + 10) / 100 * memoryMap.offsetWidth;
    // const y = (Math.random() * 80 + 10) / 100 * memoryMap.offsetHeight;

    

    // move smoothly
    label.style.left = x + "px";
    label.style.top = y + "px";

    label.dataset.x = x;
label.dataset.y = y;

    // schedule next move in 3–6 sec
    const delay = Math.random() * 10000;
    setTimeout(move, delay);
  }

  move();

}



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
   const pxX = (Math.random() * 80 + 10) / 100 * memoryMap.offsetWidth;
  const pxY = (Math.random() * 80 + 10) / 100 * memoryMap.offsetHeight;

  //store position
  label.dataset.x = pxX;
  label.dataset.y = pxY;

  label.style.left = pxX + "px";
  label.style.top = pxY + "px";

  memoryMap.appendChild(label);

  // add hover behavior
  label.addEventListener('mouseenter', showTooltip);
  label.addEventListener('mouseleave', hideTooltip);

  floatLabel(label);
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
  

