import DataFilter from '../DataFilter.js';

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
        
        const goalCategory = DomManager.createElement('select', 'goal-category-select', '', { 'name': "categories", 'id': "categories", 'data-goal-id': goal.id });
        goalCategory.appendChild(DomManager.createElement('option', '', 'No Category', { 'value': '' }));

        left.appendChild(goalCategory);
        left.appendChild(DomManager.createElement(`section`, 'goal-name-description', goal.name));
        left.appendChild(DomManager.createElement(`section`, 'goal-task-list', '', { 'data-goal-id': `${goal.id}-task-list` }));
        card.appendChild(left);

        const progress = DomManager.createElement('section', 'goal-card-progress-visualization');
        progress.appendChild(DomManager.createElement('img', 'plant-image', '', {
            'src': '../assets/plants/stage-1.png',
            'alt': 'Plant',
            'data-plant-stage': '1'
        }));
        card.appendChild(progress);

        return card;
    }

    static createTaskItem(task, editable = false) {
        const item = DomManager.createElement('div', 'subtask-item');
        item.id = `task-${task.id}`;

        const checkbox = DomManager.createElement('input', 'subtask-checkbox', '', { 
            'type': 'checkbox', 
            'value': 'completed', 
            'data-task-id': task.id 
        });

        if (task.isCompleted) {
            checkbox.checked = true;
        }

        item.appendChild(checkbox);
        item.appendChild(DomManager.createElement('span', 'subtask-name', task.name, {
            'contentEditable': true,
            'data-task-id': task.id
        }));

        if (editable) {
            const dateValue = task.dueDate ? task.dueDate.slice(0, 10) : '';
            item.appendChild(DomManager.createElement('input', 'subtask-date', '', {
                'type': 'date',
                'value': dateValue,
                'data-task-id': task.id
            }))
            item.appendChild(DomManager.createElement('button', 'delete-task-button rounded-05', 'Delete', {
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
            'src': '../assets/plants/stage-1.png',
            'alt': 'Plant',
            'data-plant-stage': '1'
        }));
        newCard.appendChild(progress);

        return newCard;
    }

    static createAddSubtaskButton(goalId) {
        const button = DomManager.createElement('button', 'new-subtask-button', '+ Add Subtask', {
            'data-goal-id': goalId
        });
        return button;
    }

    static showGoalModal(goal) {
        const goalModal = DomManager.getElement('#goal-modal');
        const goalModalName = DomManager.getElement('.modal-goal-name');
        const goalModalDetails = DomManager.getElement('.modal-goal-details');
        const goalModalPlantImage = DomManager.getElement('.modal-plant-image');
        const goalModalProgressCounter = DomManager.getElement('#goal-modal-progress-counter');

        goalModalName.textContent = goal.name;
        goalModalName.setAttribute('data-goal-id', goal.id);
        goalModalDetails.textContent = goal.description;

        const stage = Math.min(4, Math.max(1, Math.ceil((goal.progress || 0) / 25)));
        goalModalPlantImage.src = `../assets/plants/stage-${stage}.png`;

        if (goalModalProgressCounter) {
            goalModalProgressCounter.textContent = `${goal.progress || 0}%`;
        }

        DomManager.updateGoalModalProgressBarDisplay(goal.progress || 0);

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

    static filterElementsByClass(element, classList) {
        return classList.some(e => element.classList.contains(e));
    }

    static deleteWriter(element, delay = 100, animation) {
        return new Promise((resolve => {
                let text = element.textContent;
                let index = text.length - 1;
                function deleteChar() {
                    if (animation.cancelled) return;

                    if (index >= 0) {
                        element.textContent = text.substring(0, index);
                        index--;
                        setTimeout(deleteChar, delay);
                    } else {
                        resolve();
                    }
                }
                deleteChar();
            }
        ));
    }

    static typewriter(element, text, delay = 100, animation) {
        return new Promise((resolve => {
                let index = 0;
                function type() {
                    if (animation.cancelled) return;

                    if (index < text.length) {
                        element.textContent += text.charAt(index);
                        index++;
                        setTimeout(type, delay);
                    } else {
                        resolve();
                    }
                }
                type();
            })
        );
    }

    static updateProgressBarDisplay(tasks) {
        let allTasks = tasks
        allTasks = DataFilter.filterTaskPastDue(allTasks);
        const completedTasks = allTasks.filter(task => task.isCompleted);
        const todayProgress = allTasks.length === 0 ? 0 : Math.round((completedTasks.length / allTasks.length) * 100);

        let width = 0;
        const progressDisplay = DomManager.getElement("#progress-display");
        if (progressDisplay) {
            width = progressDisplay.clientWidth;
        }
        const progressBar = DomManager.getElement("#progress-bar");
        const progressCounter = DomManager.getElement("#progress-counter");
        if (progressBar && progressCounter) {
            progressBar.style.width = String(width * todayProgress/100) + "px";
            progressCounter.textContent = todayProgress + "%";
        }

        return todayProgress;
    }

    static updateGoalModalProgressBarDisplay(progress) {
        const progressDisplay = DomManager.getElement("#goal-modal-progress-display");
        if (progressDisplay) {
            const width = progressDisplay.clientWidth;
            const progressBar = DomManager.getElement("#goal-modal-progress-bar");
            const progressCounter = DomManager.getElement("#goal-modal-progress-counter");
            if (progressBar) {
                progressBar.style.width = String(width * progress / 100) + "px";
            }
            if (progressCounter) {
                progressCounter.textContent = `${progress}%`;
            }
        }
    }
}

export default DomManager;