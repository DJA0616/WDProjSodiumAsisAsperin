class Task {
    constructor(name, dueDate, goal, category) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2);
        this.name = name;
        this.dueDate = dueDate;
        this.isCompleted = false;
        this.goal = goal;
        this.category = category;
    }

    setCompleted(isCompleted) {
        this.isCompleted = isCompleted;
    }

    isPastDue() {
        return this.dueDate < new Date().toLocaleDateString('en-CA');
    }
}

export default Task;