const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");

let goalCounter = 4;

for (let i = 0; i < goalCounter; i++) {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.plant-image') || clone.querySelector('#plant');
    if (img) {
        img.src = `../assets/plants/plant-${(i % 5) + 1}.png`;
    }
    goalCardDisplay.appendChild(clone);
}