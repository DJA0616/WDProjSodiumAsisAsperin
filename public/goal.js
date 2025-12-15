function newGoal(name, date, details){
    const goal = {
        name: name,
        date: date,
        details: details,
        subtasks: [],

        subtask: {
            name: '',
            date: '',
            type: '', // e.g., 'checkbox', 'text', etc.
            completed: false
        },

        addSubtask(subtask){
            this.subtasks.push(subtask);
        },

        removeSubtask(subtask){
            const index = this.subtasks.indexOf(subtask);
            if (index > -1) {
                this.subtasks.splice(index, 1);
            }
        }
    };
    return goal;
}