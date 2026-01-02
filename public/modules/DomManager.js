class DomManager {
    static getElement(selector) {
        return document.querySelector(selector);
    }

    static clearElementContent(element) {
        if (element) {
            element.innerHTML = '';
        }
    }

    static editElementContent(element, newContent) {
        if (element) {
            element.innerHTML = newContent;
        }
    }

    static createElement(tag, className, content, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        for (const [attr, value] of Object.entries(attributes)) {
            element.setAttribute(attr, value);
        }
        return element;
    }

    static createGoalCard(goal) {
        const card = DomManager.createElement('section', 'goal-card');
        card.id = `goal-${goal.id}`;

        const left = DomManager.createElement('section', 'goal-card-left');
        left.appendChild(DomManager.createElement(`section`, 'goal-name-description', goal.name));
        left.appendChild(DomManager.createElement(`section`, 'goal-task-list', '', { 'data-goal-id': `${goal.id}-task-list` }));
        card.appendChild(left);

        const progress = DomManager.createElement('section', 'goal-card-progress-visualization');
        progress.appendChild(DomManager.createElement('img', 'plant-image', '', {
            'src': 'assets/plants/stage-1.png',
            'alt': 'Plant',
            'data-plant-stage': '1'
        }));
        card.appendChild(progress);

        return card;
    }

    static createTaskItem(task, editable = false) {
        const item = DomManager.createElement('div', 'task-item');
        item.id = `task-${task.id}`;

        const checkbox = DomManager.createElement('input', 'task-complete-checkbox', '', { 
            'type': 'checkbox', 
            'value': 'completed', 
            'data-task-id': task.id 
        });

        if (task.isCompleted) {
            checkbox.checked = true;
        }

        item.appendChild(checkbox);
        item.appendChild(DomManager.createElement('span', 'task-name', task.name, {
            'contentEditable': true,
            'data-task-id': task.id
        }));

        if (editable) {
            item.appendChild(DomManager.createElement('input', 'task-due-date', '', {
                'type': 'date',
                'value': task.dueDate,
                'data-task-id': task.id
            }))
            item.appendChild(DomManager.createElement('button', 'delete-task-button', 'Delete', {
                'data-task-id': task.id
            }));
        }
        
        return item;
    }

    static createAddGoalButton() {
        const newCard = DomManager.createElement('section', 'new-goal-card');
        newCard.appendChild(DomManager.createElement('div', 'new-goal-plus', '+'));

        const left = DomManager.createElement('section', 'new-goal-card-left');
        left.appendChild(DomManager.createElement('section', 'goal-name-description goal-name-editable show-placeholder', '', { 'contenteditable': 'true' }));
        left.appendChild(DomManager.createElement('section', 'goal-task-list'));
        newCard.appendChild(left);

        const progress = DomManager.createElement('section', 'goal-card-progress-visualization');
        progress.appendChild(DomManager.createElement('img', 'plant-image', '', {
            'src': 'assets/plants/stage-1.png',
            'alt': 'Plant',
            'data-plant-stage': '1'
        }));
        newCard.appendChild(progress);

        return newCard;
    }

    static createAddSubtaskButton(goalId) {
        const button = DomManager.createElement('button', 'add-subtask-button', 'Add Subtask', {
            'data-goal-id': goalId
        });
        return button;
    }

    static showGoalModal(goal) {
        const goalModal = DomManager.getElement('#goal-modal');
        const goalModalName = DomManager.getElement('.modal-goal-name');
        const goalModalDetails = DomManager.getElement('.modal-goal-details');
        const goalModalPlantImage = DomManager.getElement('.modal-plant-image');

        goalModalName.textContent = goal.name;
        goalModalDetails.textContent = goal.details;
        goalModalPlantImage.src = `assets/plants/stage-1.png`; // Placeholder image source

        goalModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    static closeGoalModal() {
        const goalModal = DomManager.getElement('#goal-modal');
        goalModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    static isGoalModalOpen() {
        const goalModal = DomManager.getElement('#goal-modal');
        return goalModal.style.display === 'block';
    }
}

export default DomManager;