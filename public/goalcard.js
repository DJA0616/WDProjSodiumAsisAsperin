const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");
const newTemplate = document.querySelector("#new-goal-card-template");

let goalCounter = 4;

function renderGoalCards() {
    if (!goalCardDisplay || !template || !newTemplate) return;

    // clear existing cards
    goalCardDisplay.innerHTML = '';

    // create goal cards (clone per iteration)
    for (let i = 0; i < goalCounter; i++) {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector('.plant-image') || clone.querySelector('#plant');
        const goalName = clone.querySelector('.goal-name-description');
        const goalDetails = clone.querySelector('.goal-details');

        if (goalName) {
            //Set the textContent to the actual name of the goal
            goalName.textContent = `Goal ${i + 1}`;
        }

        if (goalDetails) {
            //Set the textContent to the actual details of the goal
            goalDetails.textContent = `Details for Goal ${i + 1}`;
        }

        if (img) {
            img.src = `assets/plants/stage-1.svg`;
            img.dataset.plantStage = '1';
        }

        goalCardDisplay.appendChild(clone);
    }

    // append a single new-goal card at the end
    const newClone = newTemplate.content.cloneNode(true);
    goalCardDisplay.appendChild(newClone);
}

renderGoalCards();