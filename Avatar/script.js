const ellipses = document.querySelectorAll('.ellipse');
ellipses.forEach(ellipse => {
    ellipse.addEventListener('click', () => {
        let string = " ";
        switch (ellipse.id) {
            case 'ellipse-1':
                string = "Chest"
                break;
            case 'ellipse-2':
                string = "Upper Arms"
                break;
            case 'ellipse-3':
                string = "Back"
                break;
            case 'ellipse-4':
                string = "Shoulders"
                break;
            case 'ellipse-5':
                string = "Lower Arms"
                break;
            case 'ellipse-6':
                string = "Lower Legs"
                break;
            case 'ellipse-7':
                string = "Upper Legs"
                break;
            case 'ellipse-8':
                string = "Core"
                break;
        default:
            string = "Error"
            break;
        }
        popup(string);
    });
});

function popup(body) {
    const string = body;
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const closeButton = document.getElementById('closePopup');
    const generateInformationButton = document.getElementById('popup-generate-information');
    const generateWorkoutButton = document.getElementById('popup-generate-workout');
    const generateStretchButton = document.getElementById('popup-generate-stretch');

    // Open the popup
    popup.style.display = 'flex'; // Show the popup
    popup.style.zIndex = 99999; // Bring the popup to the front
    popupTitle.innerHTML = string; // Set the title of the

    // Close the popup
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the popup
    });

    // Close the popup by clicking outside the content
    window.addEventListener('click', event => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
};
