function createNewSubtask(newSubtaskButton, goal){
    if (!goal) return;

    // Create a new subtask object with default values
    const today = new Date().toISOString().split('T')[0];
    const newSubtask = {
        name: 'New Subtask',
        date: today, // Placeholder date
        type: 'text', // Default type
        completed: false
    };

    // Add the new subtask to the goal's subtasks array
    goal.addSubtask(newSubtask);
    
    // Re-render the subtasks to include the new one
    if (window.renderSubtasks) {
        window.renderSubtasks();
    }
}

// Make createNewSubtask globally accessible
window.createNewSubtask = createNewSubtask; 