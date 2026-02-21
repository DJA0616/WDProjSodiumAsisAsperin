import DomManager from "./DomManager.js";
import DataFilter from "../DataFilter.js";

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
        this.setupModalListeners();
        this.setupTaskListeners();
        this.setupModalTaskListeners();
        this.setupProgressBarListeners();
        this.setupThemeListeners();
    }

    setupAddGoalListeners() {
        this.goalDisplay.addEventListener('focusout', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (e.target && e.target.classList.contains('goal-name-editable')) {
                if (!e.target.textContent.trim()) e.target.classList.add('show-placeholder');
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
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;
            
            // Remove placeholder from goal-name-editable
            if (el.classList && el.classList.contains('goal-name-editable')) {
                el.classList.remove('show-placeholder');
            }

            // Add subtask
            let element = e.target;
            while (element && !element.classList.contains('new-subtask-button')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('new-subtask-button')) {
                const goalId = element.getAttribute('data-goal-id');
                this.dataManager.addTask("New Task", new Date().toLocaleDateString('en-CA'), goalId, "Uncategorized");
                const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                
                // Recalculate and update goal progress
                goal.progress = this.dataManager.calculateGoalProgress(goal.id);
                this.dataManager.updateElement("allGoals", goal.id, { progress: goal.progress });
                this.dataManager.saveToStorage("allGoals");
                DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
                
                this.renderer.renderTasks(goal, false, null, true);
                this.renderer.renderProgressVisualization(goal);
                return;
            }

            // Open goal modal
            element = e.target;
            while (element && !element.classList.contains('goal-card') && !element.classList.contains('goal-task-list')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('goal-task-list')) {
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
                this.renderer.renderGoals();
                DomManager.closeGoalModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DomManager.isGoalModalOpen()) {
                this.renderer.renderGoals();
                DomManager.closeGoalModal();
            }
        });

        modal.addEventListener('input', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('modal-goal-details')) {
                const goalId = DomManager.getElement('.modal-goal-name').getAttribute('data-goal-id');
                const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                if (goal) {
                    goal.details = el.textContent;
                    this.dataManager.saveToStorage("allGoals");
                }
            }

            if (el.classList && el.classList.contains('modal-goal-name')) {
                const goalId = el.getAttribute('data-goal-id');
                const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                if (goal) {
                    goal.name = el.textContent;
                    this.dataManager.saveToStorage("allGoals");
                }
            }
        });

        modal.addEventListener('click', (e) => {
            // Delete goal button
            if (e.target && e.target.id === 'delete-goal-button') {
                const goalId = DomManager.getElement('.modal-goal-name').getAttribute('data-goal-id');
                const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                if (goal) {
                    // Delete all tasks associated with this goal
                    const tasksToDelete = this.dataManager.getTasks().filter(t => t.goal === goalId);
                    tasksToDelete.forEach(task => {
                        this.dataManager.deleteElement("allTasks", task.id);
                    });
                    this.dataManager.saveToStorage("allTasks");
                    
                    // Delete the goal
                    this.dataManager.deleteElement("allGoals", goal.id);
                    DomManager.closeGoalModal();
                    DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
                    this.renderer.renderGoals();
                }
                return;
            }

            // Add subtask in modal
            let element = e.target;
            while (element && !element.classList.contains('new-subtask-button')) {
                element = element.parentElement;
            }

            if (element && element.classList.contains('new-subtask-button')) {
                const goalId = element.getAttribute('data-goal-id');
                this.dataManager.addTask("New Task", new Date().toLocaleDateString('en-CA'), goalId, "Uncategorized");
                const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                
                // Recalculate and update goal progress
                goal.progress = this.dataManager.calculateGoalProgress(goal.id);
                this.dataManager.updateElement("allGoals", goal.id, { progress: goal.progress });
                this.dataManager.saveToStorage("allGoals");
                DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
                
                this.renderer.renderTasks(goal, true, DomManager.getElement('.subtask-display'));
                this.renderer.renderProgressVisualization(goal);
            }
        });
    }

    setupTaskListeners() {
        this.goalDisplay.addEventListener('change', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('subtask-checkbox')) {
                // Traverse up to find the parent subtask-item
                while (el && !el.classList.contains('subtask-item')) {
                    el = el.parentElement;
                }
                
                if (el && el.id) {
                    const taskId = el.id.replace('task-', '');
                    const task = this.dataManager.getTasks().find(t => t.id === taskId);

                    if (task) {
                        this.dataManager.updateElement("allTasks", task.id, {
                            isCompleted: e.target.checked
                        });
                        this.dataManager.saveToStorage("allTasks");
                        
                        // Calculate and update goal progress
                        const goal = this.dataManager.getGoals().find(g => g.id === task.goal);
                        if (goal) {
                            goal.progress = this.dataManager.calculateGoalProgress(goal.id);
                            this.dataManager.updateElement("allGoals", goal.id, { progress: goal.progress });
                            this.dataManager.saveToStorage("allGoals");
                            this.renderer.renderProgressVisualization(goal);
                        }
                        DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
                        
                        this.renderer.renderTasks(this.dataManager.getGoals().find(g => g.id === task.goal), false, null, true);
                    }
                }
            }
        });

        this.goalDisplay.addEventListener('input', (e) => {
            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('subtask-name')) {
                // Traverse up to find the parent subtask-item
                while (el && !el.classList.contains('subtask-item')) {
                    el = el.parentElement;
                }
                if (el && el.id) {
                    const taskId = el.id.replace('task-', '');
                    this.dataManager.updateElement("allTasks", taskId, {
                        name: e.target.textContent
                    });
                }
            }
        });
    }

    setupModalTaskListeners() {
        const modal = DomManager.getElement('#goal-modal');

        modal.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('delete-task-button')) {
                const taskItem = e.target.closest('.subtask-item');
                if (taskItem && taskItem.id) {
                    const taskId = taskItem.id.replace('task-', '');
                    this.dataManager.deleteElement("allTasks", taskId);
                    const goalId = DomManager.getElement('.modal-goal-name').getAttribute('data-goal-id');
                    const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                    
                    // Recalculate and update goal progress
                    goal.progress = this.dataManager.calculateGoalProgress(goal.id);
                    this.dataManager.updateElement("allGoals", goal.id, { progress: goal.progress });
                    this.dataManager.saveToStorage("allGoals");
                    DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
                    
                    this.renderer.renderTasks(goal, true, DomManager.getElement('.subtask-display'));
                    this.renderer.renderProgressVisualization(goal);
                }
            }
        });

        modal.addEventListener('input', (e) => {
            if (e.target && e.target.classList.contains('subtask-date')) {
                const taskItem = e.target.closest('.subtask-item');
                if (taskItem && taskItem.id) {
                    const taskId = taskItem.id.replace('task-', '');
                    this.dataManager.updateElement("allTasks", taskId, {
                        dueDate: e.target.value
                    });
                }
                DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
            }

            let el = e.target;
            if (el.nodeType === 3) el = el.parentElement;

            if (el.classList && el.classList.contains('subtask-name')) {
                // Traverse up to find the parent subtask-item
                while (el && !el.classList.contains('subtask-item')) {
                    el = el.parentElement;
                }
                if (el && el.id) {
                    const taskId = el.id.replace('task-', '');
                    this.dataManager.updateElement("allTasks", taskId, {
                        name: e.target.textContent
                    });
                }
            }
        });

        modal.addEventListener('change', (e) => {
            if (e.target && e.target.classList.contains('subtask-checkbox')) {
                const taskItem = e.target.closest('.subtask-item');
                if (taskItem && taskItem.id) {
                    const taskId = taskItem.id.replace('task-', '');
                    this.dataManager.updateElement("allTasks", taskId, {
                        isCompleted: e.target.checked
                    });
                    const goalId = DomManager.getElement('.modal-goal-name').getAttribute('data-goal-id');
                    const goal = this.dataManager.getGoals().find(g => g.id === goalId);
                    
                    // Calculate and update goal progress
                    if (goal) {
                        goal.progress = this.dataManager.calculateGoalProgress(goal.id);
                        this.dataManager.updateElement("allGoals", goal.id, { progress: goal.progress });
                        this.dataManager.saveToStorage("allGoals");
                        DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
                        // Render progress visualization in modal
                        const modalProgressViz = DomManager.getElement('.modal-progress-visualization');
                        this.renderer.renderProgressVisualization(goal, modalProgressViz);
                    }
                    
                    this.renderer.renderTasks(goal, true, DomManager.getElement('.subtask-display'));
                }
            }
        });
    }

    setupProgressBarListeners() {
        const progressDisplay = DomManager.getElement("#progress-display");
        const progressBar = DomManager.getElement("#progress-bar");
        const progressCounter = DomManager.getElement("#progress-counter");

        let progress = DomManager.updateProgressBarDisplay(this.dataManager.getTasks());

        let currentAnimation = null;

        progressDisplay.addEventListener("mouseenter", async () => {
            progress = DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
            if (currentAnimation !== null) {
                currentAnimation.cancel();
            }
            const animation = { cancelled: false, cancel() { this.cancelled = true; } };
            currentAnimation = animation;
            
            progressBar.style.width = "100%";
            await DomManager.deleteWriter(progressCounter, 50, animation);
            if(animation.cancelled) return;
            await DomManager.typewriter(progressCounter, "Go", 50, animation);
            if(!animation.cancelled) currentAnimation = null;
        });

        progressDisplay.addEventListener("mouseleave", async () => {
            progress = DomManager.updateProgressBarDisplay(this.dataManager.getTasks());
            if (currentAnimation !== null) {
                currentAnimation.cancel();
            }
            const animation = { cancelled: false, cancel() { this.cancelled = true; } };
            currentAnimation = animation;

            progressBar.style.width = String(30 * progress/100) + "vw";
            await DomManager.deleteWriter(progressCounter, 50, animation);
            if(animation.cancelled) return;
            await DomManager.typewriter(progressCounter, String(progress) + "%", 50, animation);
            if(!animation.cancelled) currentAnimation = null;
        });
    }

    setupThemeListeners() {
        // Theme switching logic can be added here
    }
}

export default EventHandler;