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

  let frontData = [];
  let backData = [];

  for (let i = 0; i < 25; i++) {
    frontData.push(words[i]?.[0] || "");
    backData.push(words[i]?.[1] || "");
  }

  // 🔄 Duplex reverse (har qatorni teskariga aylantiramiz)
  let reversedBack = [];
  for (let row = 0; row < 5; row++) {
    let rowData = backData.slice(row * 5, row * 5 + 5);
    reversedBack.push(...rowData.reverse());
  }

  frontData.forEach(text => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = text;
    front.appendChild(card);
  });

  reversedBack.forEach(text => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = text;
    back.appendChild(card);
  });
}
