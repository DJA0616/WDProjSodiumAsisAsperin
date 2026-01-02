import DomManager from "./domManager.js";
import DataFilter from "./DataFilter.js";

class HomePageRenderer {
    constructor(dataManager) {
        this.dataManager = dataManager;
    }

    renderGoals() {
        const goals = this.dataManager.getGoals();
        const goalsContainer = DomManager.getElement('#goal-card-display');
        DomManager.clearElementContent(goalsContainer);

        goals.forEach(element => {
            const goal = DomManager.createGoalCard(element);
            goalsContainer.appendChild(goal);
            this.renderTasks(element, false);
        });

        goalsContainer.appendChild(DomManager.createAddGoalButton());
    }

    renderTasks(goal, editable = false, container = DomManager.getElement(`[data-goal-id='${goal.id}-task-list']`)) {
        const tasks = this.dataManager.getTasks();
        DomManager.clearElementContent(container);
        DataFilter.filterTaskByGoal(tasks, goal.id).forEach(task => {
            if (container) {
                container.appendChild(DomManager.createTaskItem(task, editable));
            }
        });

        container.appendChild(DomManager.createAddSubtaskButton(goal.id));
    }
}

export default HomePageRenderer;