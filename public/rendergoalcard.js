const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");
const newTemplate = document.querySelector("#new-goal-card-template");

var goals = [newGoal("Test", "2024-06-01", "Details for Test Goal"), newGoal("Sample", "2024-07-01", "Details for Sample Goal")]; // This should be replaced with actual data retrieval logic

function clearGoalCards() {
    if (goalCardDisplay) {
        goalCardDisplay.innerHTML = '';
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

        // Add click event to open modal
        if (goalCard) {
            const goalNameText = goalName ? goalName.textContent : 'Goal';
            const goalDetailsText = goalDetails ? goalDetails.textContent : 'No details';
            const plantSrc = img ? img.src : 'assets/plants/stage-1.svg';
            
            goalCard.addEventListener('click', () => {
                if (window.openModal) {
                    window.openModal(goalNameText, goalDetailsText, plantSrc);
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