class DataFilter {
    static filterTaskByGoal(tasks, goalId) {
        return tasks.filter(task => task.goal === goalId);
    }

    static filterTaskPastDueCompleted(tasks) {
        return tasks.filter(task => {
            const isPastDue = task.dueDate < new Date().toLocaleDateString('en-CA');
            return !(isPastDue && task.isCompleted);
        });
    }

    static filterTaskPastDue(tasks) {
        return tasks.filter(task => task.dueDate === new Date().toLocaleDateString('en-CA'));
    }
}

export default DataFilter;