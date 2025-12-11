const progressBar = document.getElementById("progress-bar");

var progress = 67;

progressBar.style.width = String(30 * progress/100) + "vw";