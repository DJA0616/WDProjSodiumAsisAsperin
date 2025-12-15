document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('goal-modal');
    const modalGoalName = document.querySelector('.modal-goal-name');
    const modalGoalDetails = document.querySelector('.modal-goal-details');
    const modalPlantImage = document.querySelector('.modal-plant-image');

    // Function to open modal with goal data
    // replace data later
    function openModal(goalName, goalDetails, plantSrc) {
        modalGoalName.textContent = goalName;
        modalGoalDetails.textContent = goalDetails;
        modalPlantImage.src = plantSrc;
        modal.style.display = 'block';
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Make openModal globally accessible so it can be called from renderGoalCards
    window.openModal = openModal;
});
