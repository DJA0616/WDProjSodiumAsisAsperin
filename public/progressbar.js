const progressDisplay = document.getElementById("progress-display");
const progressBar = document.getElementById("progress-bar");
const progressCounter = document.getElementById("progress-counter");

var progress = 67;

progressBar.style.width = String(30 * progress/100) + "vw";
progressCounter.textContent = progress + "%";

let currentAnimation = null;

async function onHover() {
    if (currentAnimation !== null) {
        currentAnimation.cancel();
    }
    const animation = { cancelled: false, cancel() { this.cancelled = true; } };
    currentAnimation = animation;
    
    progressBar.style.width = "100%";
    await deleteWriter(progressCounter, 50, animation);
    if(animation.cancelled) return;
    await typewriter(progressCounter, "Go", 50, animation);
    if(!animation.cancelled) currentAnimation = null;
}

async function onLeave() {
    if (currentAnimation !== null) {
        currentAnimation.cancel();
    }
    const animation = { cancelled: false, cancel() { this.cancelled = true; } };
    currentAnimation = animation;

    progressBar.style.width = String(30 * progress/100) + "vw";
    await deleteWriter(progressCounter, 50, animation);
    if(animation.cancelled) return;
    await typewriter(progressCounter, String(progress) + "%", 50, animation);
    if(!animation.cancelled) currentAnimation = null;
}

function deleteWriter(element, delay = 100, animation) {
    return new Promise((resolve => {
            let text = element.textContent;
            let index = text.length - 1;
            function deleteChar() {
                if (animation.cancelled) return;

                if (index >= 0) {
                    element.textContent = text.substring(0, index);
                    index--;
                    setTimeout(deleteChar, delay);
                } else {
                    resolve();
                }
            }
            deleteChar();
        }
    ));
}

function typewriter(element, text, delay = 100, animation) {
    return new Promise((resolve => {
            let index = 0;
            function type() {
                if (animation.cancelled) return;

                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, delay);
                } else {
                    resolve();
                }
            }
            type();
        })
    );
}

progressDisplay.addEventListener("mouseenter", onHover);
progressDisplay.addEventListener("mouseleave", onLeave);