import DomManager from "./domManager.js";
import DataFilter from "./DataFilter.js";

class EventHandler {
    constructor(dataManager, renderer) {
        this.dataManager = dataManager;
        this.renderer = renderer;
        this.goalDisplay = DomManager.getElement('#goal-card-display');

        this.setupListeners();
    }

    setupListeners() {
        this.setupAddGoalListeners();
        this.setupAddTaskListeners();
        this.setupGoalCardListeners();
        this.setupModalListeners();
    }

    setupAddGoalListeners() {
        this.goalDisplay.addEventListener('focusout', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (e.target && e.target.classList.contains('goal-name-editable')) {
                e.target.classList.add('show-placeholder');
            }
        });
        this.goalDisplay.addEventListener('click', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;
            
            if (el.classList && el.classList.contains('goal-name-editable')) {
                el.classList.remove('show-placeholder');
            }
        });
        this.goalDisplay.addEventListener('keydown', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('goal-name-editable')) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (el.textContent.trim()) {
                        this.dataManager.addGoal(el.textContent.trim(), "Details for " + el.textContent.trim(), "Uncategorized");
                        this.renderer.renderGoals();
                    }
                }
            }
        });
    }

    setupAddTaskListeners() {
        this.goalDisplay.addEventListener('click', (e) => {
            let element = e.target;
            while (element && !element.classList.contains('add-subtask-button')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('add-subtask-button')) {
                this.dataManager.addTask("New Task", new Date().toLocaleDateString('en-CA'), element.getAttribute('data-goal-id'), "Uncategorized");
                this.renderer.renderTasks(this.dataManager.getGoals().find(g => g.id === element.getAttribute('data-goal-id')), true);
            }
        });
    }

    setupGoalCardListeners() {
        this.goalDisplay.addEventListener('click', (e) => {
            // Don't open modal if clicking on add-subtask-button
            let element = e.target;
            while (element && !element.classList.contains('add-subtask-button') && !element.classList.contains('goal-card')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('add-subtask-button')) {
                return;
            }

            element = e.target;
            while (element && !element.classList.contains('goal-card')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('goal-card')) {
                const goalId = element.id.replace('goal-', '');
                const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                if (goal) {
                    DomManager.showGoalModal(goal);
                    this.renderer.renderTasks(goal, true, DomManager.getElement('.subtask-display'));
                }
            }
        });
    }

    setupModalListeners() {
        const modal = DomManager.getElement('#goal-modal');
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (modal.style.display === 'block' && e.target === modal) {
                DomManager.closeGoalModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DomManager.isGoalModalOpen()) {
                DomManager.closeGoalModal();
            }
        });

        modal.addEventListener('input', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('modal-goal-details')) {
                const goalName = DomManager.getElement('.modal-goal-name').textContent;
                const goal = this.dataManager.getGoals().find(g => g.name === goalName);
                if (goal) {
                    goal.details = el.textContent;
                    this.dataManager.saveToStorage("allGoals");
                }
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'delete-goal-button') {
                const goalName = DomManager.getElement('.modal-goal-name').textContent;
                const goal = this.dataManager.getGoals().find(g => g.name === goalName);
                if (goal) {
                    this.dataManager.deleteElement("allGoals", goal.id);
                    DomManager.closeGoalModal();
                    this.renderer.renderGoals();
                }
            }
        });

        modal.addEventListener('click', (e) => {
            let element = e.target;
            while (element && !element.classList.contains('add-subtask-button')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('add-subtask-button')) {
                this.dataManager.addTask("New Task", new Date().toLocaleDateString('en-CA'), element.getAttribute('data-goal-id'), "Uncategorized");
                this.renderer.renderTasks(this.dataManager.getGoals().find(g => g.id === element.getAttribute('data-goal-id')), true, DomManager.getElement('.subtask-display'));
            }
        });
    }

    setupTaskListeners() {
        this.goalDisplay.addEventListener('change', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('task-complete-checkbox')) {
                // Traverse up to find the parent task-item
                while (el && !el.classList.contains('task-item')) {
                    el = el.parentElement;
                }
                
                if (el && el.id) {
                    const taskId = el.id.replace('task-', '');
                    const task = this.dataManager.getTasks().find(t => t.id === taskId);

                    if (task) {
                        task.completed = e.target.checked;
                        this.dataManager.updateElement("allTasks", task.id, { isCompleted: true });
                        this.dataManager.saveToStorage("allTasks");
                        this.renderer.renderTasks(this.dataManager.getGoals().find(g => g.id === task.goal), true);
                    }
                }
            }
        });
    }
}

export default EventHandler;