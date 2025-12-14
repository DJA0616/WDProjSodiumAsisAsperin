const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");
const newTemplate = document.querySelector("#new-goal-card-template");

let goalCounter = 0;

// Cross-fade plant image with smooth transition
function updatePlantStage(plantImg, newStage, duration = 600) {
    if (!plantImg) return;
    
    const currentStage = parseInt(plantImg.dataset.plantStage) || 1;
    if (currentStage === newStage) return; // no change
    
    plantImg.style.transition = `opacity ${duration}ms ease-in-out`;
    plantImg.style.opacity = '0';
    
    setTimeout(() => {
        plantImg.src = `assets/plants/stage-${newStage}.svg`;
        plantImg.dataset.plantStage = newStage;
        plantImg.style.opacity = '1';
    }, duration / 2);
}

function renderGoalCards() {
    if (!goalCardDisplay || !template || !newTemplate) return;

    // clear existing cards
    goalCardDisplay.innerHTML = '';

    // create goal cards (clone per iteration)
    for (let i = 0; i < goalCounter; i++) {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector('.plant-image') || clone.querySelector('#plant');
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