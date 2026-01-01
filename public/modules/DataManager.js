import Category from "./Category.js";
import Goal from "./Goal.js";
import Task from "./Task.js";

class DataManager {
    // Data Manager basic handles
    constructor() {
        this.allCategories = this.loadFromStorage("allCategories");
        this.allGoals = this.loadFromStorage("allGoals");
        this.allTasks = this.loadFromStorage("allTasks");
    }

    saveToStorage(arrayName) {
        localStorage.setItem(arrayName, JSON.stringify(this[arrayName]));
    }

    loadFromStorage(arrayName) {
        return JSON.parse(localStorage.getItem(arrayName)) || [];
    }

    // Data Manager functions for rendering data
    getCategories() {
        return this.allCategories;
    }

    getGoals() {
        return this.allGoals;
    }

    getTasks() {
        return this.allTasks;
    }
    
    //Data Manager functions for responding to interactions
    updateElement(arrayName, elementId, updatedProperties) {
        const elementIndex = this[arrayName].findIndex(element => element.id === elementId);
        if (elementIndex !== -1) {
            Object.assign(this[arrayName][elementIndex], updatedProperties);
            this.saveToStorage(arrayName);
        }
    }

    addCategory(name, color) {
        const newCategory = new Category(name, color);
        this.allCategories.push(newCategory);
        this.saveToStorage("allCategories");
        return newCategory;
    }

    addGoal(name, description, category) {
        const newGoal = new Goal(name, description, category);
        this.allGoals.push(newGoal);
        this.saveToStorage("allGoals");
        return newGoal;
    }

    addTask(name, dueDate, goal, category) {
        const newTask = new Task(name, dueDate, goal, category);
        this.allTasks.push(newTask);
        this.saveToStorage("allTasks");
        return newTask;
    }

    deleteElement(elementType, elementId) {
        const collectionName = this.getPluralCollectionName(elementType);
        this[collectionName] = this[collectionName].filter(element => element.id !== elementId);
        this.saveToStorage(collectionName);
    }
}

export default DataManager;