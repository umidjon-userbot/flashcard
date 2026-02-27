let words = [];

document.getElementById("csvFile").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const lines = event.target.result.split("\n");
    words = lines.map(line => line.split(","));
  };

  reader.readAsText(file);
});

function generateCards() {
  const front = document.getElementById("front");
  const back = document.getElementById("back");

  front.innerHTML = "";
  back.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const hanzi = words[i]?.[0] || "";
    const pinyin = words[i]?.[1] || "";

    const frontCard = document.createElement("div");
    frontCard.className = "card";
    frontCard.textContent = hanzi;

    const backCard = document.createElement("div");
    backCard.className = "card";
    backCard.textContent = pinyin;

    front.appendChild(frontCard);
    back.appendChild(backCard);
  }
}
