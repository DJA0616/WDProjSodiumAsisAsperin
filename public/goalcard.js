const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");
const newTemplate = document.querySelector("#new-goal-card-template");

let goalCounter = 0;

function renderGoalCards() {
    if (!goalCardDisplay || !template || !newTemplate) return;

    // clear existing cards
    goalCardDisplay.innerHTML = '';

    // create goal cards (clone per iteration)
    for (let i = 0; i < goalCounter; i++) {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector('.plant-image') || clone.querySelector('#plant');
        if (img) {
            img.src = `assets/plants/plant-${(i % 5) + 1}.png`;
        }
        goalCardDisplay.appendChild(clone);
    }

    // append a single new-goal card at the end
    const newClone = newTemplate.content.cloneNode(true);
    goalCardDisplay.appendChild(newClone);
}

renderGoalCards();