const timeEl = document.getElementById("time");

function updateTime() {
  timeEl.textContent = Date.now();
}

updateTime();
setInterval(updateTime, 1000);