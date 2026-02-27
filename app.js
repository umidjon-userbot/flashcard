let database = [];
let currentWords = [];
const CARDS_PER_PAGE = 25;

fetch("hsk_database.json")
  .then(res => res.json())
  .then(data => database = data);

function clearPages() {
  document.getElementById("pages").innerHTML = "";
}

function generateFromDB() {
  clearPages();
  const level = document.getElementById("hskLevel").value;
  const search = document.getElementById("searchBox").value.toLowerCase();

  currentWords = database.filter(w => {
    const matchLevel = level ? w.level == level : true;
    const matchSearch =
      w.hanzi.includes(search) ||
      (w.english && w.english.toLowerCase().includes(search));
    return matchLevel && matchSearch;
  });

  render(currentWords);
}

function generateManual() {
  clearPages();
  const input = document.getElementById("manualInput").value.trim();
  if (!input) return;

  currentWords = input.split(/\s+/).map(h => {
    return database.find(w => w.hanzi === h)
      || { hanzi: h, pinyin: "", english: "" };
  });

  render(currentWords);
}

function render(words) {
  const container = document.getElementById("pages");

  for (let i = 0; i < words.length; i += CARDS_PER_PAGE) {

    const chunk = words.slice(i, i + CARDS_PER_PAGE);

    const frontPage = document.createElement("div");
    frontPage.className = "page front";

    const backPage = document.createElement("div");
    backPage.className = "page back";

    chunk.forEach(word => {
      frontPage.innerHTML += `<div class="card">${word.hanzi}</div>`;
      backPage.innerHTML += `
        <div class="card">
          <div class="pinyin">${word.pinyin || ""}</div>
          <div class="english">${word.english || ""}</div>
        </div>`;
    });

    container.appendChild(frontPage);
    container.appendChild(backPage);
  }
}

function shuffleCards() {
  currentWords.sort(() => Math.random() - 0.5);
  clearPages();
  render(currentWords);
}

function downloadPDF() {
  const element = document.getElementById("pages");
  html2pdf().set({
    margin: 0,
    filename: "flashcards.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }).from(element).save();
}

function toggleDark() {
  document.body.classList.toggle("dark");
}
