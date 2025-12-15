const progressDisplay = document.getElementById("progress-display");
const progressBar = document.getElementById("progress-bar");
const progressCounter = document.getElementById("progress-counter");

var progress = 67;

progressBar.style.width = String(30 * progress/100) + "vw";
progressCounter.textContent = progress + "%";

function onHover() {
    progressBar.style.width = "100%";
    progressCounter.textContent = "Go";
}

function onLeave() {
    progressBar.style.width = String(30 * progress/100) + "vw";
    progressCounter.textContent = progress + "%";
}

progressDisplay.addEventListener("mouseover", onHover);
progressDisplay.addEventListener("mouseout", onLeave);