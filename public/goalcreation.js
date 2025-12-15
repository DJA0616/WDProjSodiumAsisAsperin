document.addEventListener('DOMContentLoaded', () => {
    const goalCardDisplay = document.querySelector('.goal-card-display');
    const newTemplate = document.querySelector('#new-goal-card-template');

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
            const h1 = document.createElement('h1');
            h1.textContent = name;
            const p = document.createElement('p');
            p.textContent = '';
            nameSection.appendChild(h1);
            nameSection.appendChild(p);
        }

        // Append a fresh new-goal-card at the end and initialize it
        if (goalCardDisplay && newTemplate) {
            const frag = newTemplate.content.cloneNode(true);
            goalCardDisplay.appendChild(frag);
            const appended = goalCardDisplay.lastElementChild;
            if (appended) {
                // remove duplicated id inside cloned node if present
                const inner = appended.querySelector('#new-goal-name-description');
                if (inner) inner.removeAttribute('id');
                setupNewCard(appended);
            }
        }
    }

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

    // initialize existing new-goal-card(s)
    const newCards = document.querySelectorAll('.new-goal-card');
    newCards.forEach(card => setupNewCard(card));
});