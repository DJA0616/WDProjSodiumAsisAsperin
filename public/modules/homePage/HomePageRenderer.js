import DomManager from "./DomManager.js";
import DataFilter from "../DataFilter.js";

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
            this.renderTasks(element, false, null, true);
            this.renderProgressVisualization(element);
        });

        goalsContainer.appendChild(DomManager.createAddGoalButton());
    }

    renderTasks(goal, editable = false, container = null, filterTaskPastDueCompleted = false) {
        let tasks = this.dataManager.getTasks();
        if (!container) {
            container = DomManager.getElement(`[data-goal-id='${goal.id}-task-list']`);
        }
        DomManager.clearElementContent(container);
        if (filterTaskPastDueCompleted) {
            tasks = DataFilter.filterTaskPastDueCompleted(tasks);
        }
        DataFilter.filterTaskByGoal(tasks, goal.id).forEach(task => {
            if (container) {
                container.appendChild(DomManager.createTaskItem(task, editable));
            }
        });

        container.appendChild(DomManager.createAddSubtaskButton(goal.id));
    }

    renderProgressVisualization(goal, progressViz = null) {
        if (!progressViz) {
            progressViz = DomManager.getElement(`#goal-${goal.id} .goal-card-progress-visualization`);
        }
        if (progressViz) {
            const progress = goal.progress;
            const stage = Math.min(4, Math.max(1, Math.ceil(progress / 25)));
            const img = progressViz.querySelector('.plant-image');
            if (img) {
                img.src = `../../../assets/plants/stage-${stage}.png`;
                img.dataset.plantStage = stage;
            }
            progressViz.style.setProperty('--progress', `${progress}%`);
        }
    }
}

export default HomePageRenderer;