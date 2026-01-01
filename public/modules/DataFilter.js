class DataFilter {
    static filterTaskByGoal(tasks, goalId) {
        return tasks.filter(task => task.goal === goalId);
    }

    static filterTaskPastDueCompleted(tasks) {
        return tasks.filter(task => {
            return !(task.isPastDue() && task.isCompleted());
        });
    }
}

export default DataFilter;