const words = new Map();
words.set("egg", "蛋");
words.set("eggs", "蛋");
words.set("tomato", "番茄");
words.set("tomatoes", "番茄");
words.set("pork", "猪肉");

const englishInput = document.getElementById("englishInput");
const chineseInput = document.getElementById("chineseInput");
const addBtn = document.getElementById("addWordBtn");
const wordList = document.getElementById("wordList");


function refreshWordList() {
  wordList.innerHTML = "";

  words.forEach((cn, en) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${en} → ${cn}</span>
      <span class="delete-btn" data-word="${en}">✕</span>
    `;

    wordList.appendChild(li);
  });

  // add delete behavior
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const word = e.target.dataset.word;
      words.delete(word);          // remove from Map
      refreshWordList();           // redraw list

      e.stopPropagation();         // prevent hover flicker
    });
  });
}

// add new word to Map
addBtn.addEventListener("click", () => {
  const en = englishInput.value.trim().toLowerCase();
  const cn = chineseInput.value.trim();

  if (!en || !cn) return; // ignore empty

  words.set(en, cn);

  englishInput.value = "";
  chineseInput.value = "";

  refreshWordList();
});

// prevent non-Chinese input
let composing = false;

chineseInput.addEventListener("compositionstart", () => {
  composing = true;
});

chineseInput.addEventListener("compositionend", () => {
  composing = false;
  chineseInput.value = chineseInput.value.replace(/[^\u4e00-\u9fff]/g, "");
});

chineseInput.addEventListener("input", () => {
  if (composing) return; // ⛔ do nothing during pinyin typing
  chineseInput.value = chineseInput.value.replace(/[^\u4e00-\u9fff]/g, "");
});

// initialize display
refreshWordList();




  // split text into words + spaces
const p = document.getElementById("text");
const wordArray = p.textContent.split(/(\s+)/);
p.innerHTML = wordArray
//wrap word if not a whitespace
  .map(word => (word.trim() === "" ? word : `<span class="bounce">${word}</span>`))
  .join("");


// after wrapping
    document.querySelectorAll(".bounce").forEach(span => {
    const original = span.textContent;
    const lower = original.toLowerCase().replace(/[.,!?;:]/g, ""); //cleaned

    span.addEventListener("mouseenter", () => {
        if (words.has(lower)) {
        span.dataset.original = original;        // store original
        span.textContent = words.get(lower);     // set Chinese
        span.classList.add("chinese-active");    // add Chinese style
        } else {
            span.dataset.original = original;
            const colors = ["yellow", "red", "green"];
            const icons = Array(original.length)
                .fill()
                .map(() => {
                    const pick = colors[Math.floor(Math.random() * colors.length)];
                    return `<img src="assets/icons/fortune/${pick}.svg" class="icon">`;
                })
                .join("");
            span.innerHTML = icons;
            // span.innerHTML = `<img src="assets/icons/yellow.svg" class="icon">`;
            span.classList.add("icon-active");
        }
    });

    span.addEventListener("mouseleave", () => {

        const delay = 2000; // 2 seconds, change as needed

        setTimeout(() => {
            if (span.dataset.original) {
                span.textContent = span.dataset.original; // restore English
                span.classList.remove("chinese-active"); // remove Chinese style
                span.classList.remove("icon-active");   // remove icon style
        }
        }, delay);

    });
});