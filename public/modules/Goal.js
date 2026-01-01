class Goal {
    constructor(name, description, category) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2);
        this.name = name;
        this.description = description;
        this.category = category;
        this.progress = 0;
    }
}

export default Goal;