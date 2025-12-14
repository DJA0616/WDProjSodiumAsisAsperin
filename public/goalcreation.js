document.addEventListener('DOMContentLoaded', () => {
    // Convert a new-goal-card element into a regular goal-card
    function convertNewCard(card, name) {
        if (!card) return;
        card.classList.remove('new-goal-card');
        card.classList.add('goal-card');

        // remove the centered plus
        const plus = card.querySelector('.new-goal-plus');
        if (plus) plus.remove();

        // populate name into the left section
        const nameSection = card.querySelector('.goal-name-description');
        if (nameSection) {
            nameSection.contentEditable = 'false';
            nameSection.classList.remove('goal-name-editable');
            nameSection.classList.remove('show-placeholder');
            nameSection.innerHTML = '';
            const h2 = document.createElement('h2');
            h2.textContent = name;
            const p = document.createElement('p');
            p.textContent = '';
            nameSection.appendChild(h2);
            nameSection.appendChild(p);
        }
    }

    // Attach listeners to any new-goal-card instances already in the DOM
    const newCards = document.querySelectorAll('.new-goal-card');
    newCards.forEach(card => {
        const editableSection = card.querySelector('.goal-name-editable');
        if (!editableSection) return;

        // Show placeholder initially
        editableSection.classList.add('show-placeholder');

        // Hide placeholder on first input
        editableSection.addEventListener('input', () => {
            if (editableSection.textContent.trim()) {
                editableSection.classList.remove('show-placeholder');
            }
        });

        // Show placeholder again if empty
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

        // Also convert when the section loses focus (if it contains text)
        editableSection.addEventListener('blur', () => {
            const val = editableSection.textContent.trim();
            if (val) convertNewCard(card, val);
        });
    });
});