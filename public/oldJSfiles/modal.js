document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('goal-modal');
    const modalGoalName = document.querySelector('.modal-goal-name');
    const modalGoalDetails = document.querySelector('.modal-goal-details');
    const modalPlantImage = document.querySelector('.modal-plant-image');

    // Function to open modal with goal data
    function openModal(goal, plantSrc) {
        if (!goal) return;
        
        modalGoalName.textContent = goal.name;
        modalGoalDetails.textContent = goal.details;
        modalPlantImage.src = plantSrc;
        
        // Set currentGoal for subtask rendering
        currentGoal = goal;
        
        modal.style.display = 'block';
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        renderSubtasks();
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        // Re-enable background scrolling
        document.body.style.overflow = '';
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Make openModal globally accessible so it can be called from renderGoalCards
    window.openModal = openModal;
});
