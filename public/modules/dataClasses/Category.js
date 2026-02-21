class Category {
    constructor(name, color) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2);
        this.name = name;
        this.color = color;
    }
}

export default Category;