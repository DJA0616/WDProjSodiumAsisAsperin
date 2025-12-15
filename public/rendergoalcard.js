const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");
const newTemplate = document.querySelector("#new-goal-card-template");

var goals = [];

function clearGoalCards() {
    if (goalCardDisplay) {
        goalCardDisplay.innerHTML = '';
    }
}

function updateProgressDisplay(goalCard, progress) {
    const progressViz = goalCard.querySelector('.goal-card-progress-visualization');
    if (progressViz) {
        progressViz.style.setProperty('--progress', `${progress}%`);
    }
}

function renderGoalCards() {
    if (!goalCardDisplay || !template || !newTemplate) return;

    clearGoalCards();

    // create goal cards (clone per iteration)
    for (let i = 0; i < goals.length; i++) {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector('.plant-image') || clone.querySelector('#plant');
        const goalName = clone.querySelector('.goal-name-description');
        const goalDetails = clone.querySelector('.goal-details');
        const goalCard = clone.querySelector('.goal-card');
        const progressViz = clone.querySelector('.goal-card-progress-visualization');

        if (goalName) {
            //Set the textContent to the actual name of the goal
            goalName.textContent = i < goals.length ? goals[i].name : `Goal ${i + 1}`;
        }

        if (goalDetails) {
            //Set the textContent to the actual details of the goal
            goalDetails.textContent = i < goals.length ? goals[i].details : `Details for Goal ${i + 1}`;
        }

        if (img) {
            img.src = `assets/plants/stage-1.svg`;
            img.dataset.plantStage = '1';
        }

        // Set progress visualization
        if (progressViz && goals[i]) {
            const progress = goals[i].getProgress();
            progressViz.style.setProperty('--progress', `${progress}%`);
        }

        // Add click event to open modal
        if (goalCard) {
            const plantSrc = img ? img.src : 'assets/plants/stage-1.svg';
            const goalIndex = i; // Capture the index
            
            goalCard.addEventListener('click', () => {
                if (window.openModal && goals[goalIndex]) {
                    window.openModal(goals[goalIndex], plantSrc);
                }
            });
            
            // Add cursor pointer to indicate clickability
            goalCard.style.cursor = 'pointer';
        }

        goalCardDisplay.appendChild(clone);
    }

    // append a single new-goal card at the end
    const newClone = newTemplate.content.cloneNode(true);
    goalCardDisplay.appendChild(newClone);
}

renderGoalCards();