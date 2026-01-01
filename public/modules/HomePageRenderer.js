import DomManager from "./domManager.js";
import DataFilter from "./DataFilter.js";

class HomePageRenderer {
    constructor(dataManager) {
        this.dataManager = dataManager;
    }

    renderGoals() {
        const goals = this.dataManager.getGoals();
        const tasks = this.dataManager.getTasks();
        const goalsContainer = DomManager.getElement('#goal-card-display');
        DomManager.clearElementContent(goalsContainer);

        goals.forEach(element => {
            const goal = DomManager.createGoalCard(element);
            goalsContainer.appendChild(goal);
            DataFilter.filterTaskByGoal(tasks, element.id).forEach(task => {
                const taskList = goal.querySelector(`[data-goal-id='${element.id}-task-list']`);
                if (taskList) taskList.appendChild(DomManager.createTaskItem(task, true));
            });
            goal.appendChild(DomManager.createAddSubtaskButton(element.id));
        });

        goalsContainer.appendChild(DomManager.createAddGoalButton());
    }
}

export default HomePageRenderer;