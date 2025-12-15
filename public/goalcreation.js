// Helper to initialize a single new-goal-card
function setupNewCard(card) {
        const editableSection = card.querySelector('.goal-name-editable');
        if (!editableSection) return;

        // Show placeholder initially
        editableSection.classList.add('show-placeholder');

        // Hide placeholder when user types
        editableSection.addEventListener('input', () => {
            if (editableSection.textContent.trim()) {
                editableSection.classList.remove('show-placeholder');
            }
        });

        // Show placeholder again if empty on blur
        editableSection.addEventListener('blur', () => {
            if (!editableSection.textContent.trim()) {
                editableSection.classList.add('show-placeholder');
            }
        });

        // Convert on Enter
        editableSection.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = editableSection.textContent.trim();
                if (val) convertNewCard(card, val);
            }
        });

}

// Convert a new-goal-card element into a regular goal-card
function convertNewCard(card, name) {
    if (!card) return;

    goals.push(newGoal(name, "2024-12-31", "Details for " + name));     // Placeholder date and details

    renderGoalCards();

    // Setup the new card that was just created
    const newCard = document.querySelector('.new-goal-card');
    if (newCard) setupNewCard(newCard);
}

document.addEventListener('DOMContentLoaded', () => {
    // initialize existing new-goal-card(s)
    const newCards = document.querySelectorAll('.new-goal-card');
    newCards.forEach(card => setupNewCard(card));
});