
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  fetch("/.netlify/functions/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tg.initDataUnsafe)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").innerText = "Login Success";
  })
  .catch(() => {
    document.getElementById("status").innerText = "Login Failed";
  });
}
