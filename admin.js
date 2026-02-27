
fetch("/.netlify/functions/admin-stats")
.then(res => res.json())
.then(data => {
  document.getElementById("stats").innerText =
    "Total Users: " + data.totalUsers +
    " | Total Sets: " + data.totalSets;
});
