const subtaskDisplay = document.querySelector('.subtask-display');
const subtaskTemplate = document.getElementById('subtask-template');
const newsubtaskTemplate = document.getElementById('new-subtask-template');
var currentGoal = null; // This should be set to the goal whose subtasks are to be displayed

function clearSubtasks() {
    if (subtaskDisplay) {
        subtaskDisplay.innerHTML = '';
    }
}

function renderSubtasks() {
    if (!subtaskDisplay || !newsubtaskTemplate) return;
    clearSubtasks();
    
    // Render existing subtasks if currentGoal has them
    if (currentGoal && currentGoal.subtasks && subtaskTemplate) {
        for (let i = 0; i < currentGoal.subtasks.length; i++) {
            const clone = subtaskTemplate.content.cloneNode(true);
            const subtaskName = clone.querySelector('.subtask-name');
            const subtaskDate = clone.querySelector('.subtask-date');
            const subtaskType = clone.querySelector('.subtask-type');
            const subtaskCheckbox = clone.querySelector('.subtask-checkbox');
            
            if (subtaskName) {
                subtaskName.textContent = currentGoal.subtasks[i].name;
                subtaskName.contentEditable = true;
                const subtaskIndex = i;
                
                // Save on blur (when user clicks away)
                subtaskName.addEventListener('blur', function() {
                    currentGoal.subtasks[subtaskIndex].name = this.textContent.trim();
                });
                
                // Save on Enter key
                subtaskName.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.blur();
                    }
                });
            }
            if (subtaskDate) {
                subtaskDate.textContent = currentGoal.subtasks[i].date;
            }
            if (subtaskType) {
                subtaskType.textContent = currentGoal.subtasks[i].type;
            }
            if (subtaskCheckbox) {
                subtaskCheckbox.checked = currentGoal.subtasks[i].completed || false;
                const subtaskIndex = i;
                subtaskCheckbox.addEventListener('change', function() {
                    currentGoal.subtasks[subtaskIndex].completed = this.checked;
                });
            }
            subtaskDisplay.appendChild(clone);
        }
    }
    
    // Append a single new subtask button at the end
    const newSubtaskClone = newsubtaskTemplate.content.cloneNode(true);
    const newButton = newSubtaskClone.querySelector('.new-subtask-button');
    
    // Add click event to create new subtask
    if (newButton && window.createNewSubtask) {
        newButton.addEventListener('click', () => {
            window.createNewSubtask(newButton, currentGoal);
        });
        
        // Add cursor pointer to indicate clickability
        newButton.style.cursor = 'pointer';
    }
    
    subtaskDisplay.appendChild(newSubtaskClone);
}

// Make renderSubtasks globally accessible
window.renderSubtasks = renderSubtasks;