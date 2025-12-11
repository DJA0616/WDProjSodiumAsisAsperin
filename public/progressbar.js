const progressBar = document.getElementById("progress-bar");
const progressCounter = document.getElementById("progress-counter");

var progress = 67;

progressBar.style.width = String(30 * progress/100) + "vw";
progressCounter.textContent = progress + "%";