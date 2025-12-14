const goalCardDisplay = document.querySelector(".goal-card-display");
const newGoalCardDisplay = document.querySelector(".new-goal-card-display");
const template = document.querySelector("#goal-card-template");
const newTemplate = document.querySelector("#new-goal-card-template");

let goalCounter = 4;

for (let i = 0; i < goalCounter; i++) {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.plant-image') || clone.querySelector('#plant');
    if (img) {
        // paths should be relative to the HTML document (repo root), not the JS file
        img.src = `assets/plants/plant-${(i % 5) + 1}.png`;
    }
    goalCardDisplay.appendChild(clone);
}

const newClone = newTemplate.content.cloneNode(true);
goalCardDisplay.appendChild(newClone);