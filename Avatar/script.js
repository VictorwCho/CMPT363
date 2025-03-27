/**
 * The muscle groups and their respective muscles
 */
const muscleGroups = {
    "Chest": ["All", "Upper Chest", "Lower Chest"],
    "Upper Arms": ["All", "Biceps", "Triceps", "Forearms"],
    "Back": ["All", "Lats", "Traps", "Rhomboids" ],
    "Shoulders": ["All", "Deltoids", "Rotator Cuff"],
    "Lower Arms": ["All", "Flexors", "Extensors"],
    "Lower Legs": ["All", "Calves", "Shins"],
    "Upper Legs": ["All", "Quads", "Hamstrings", "Glutes"],
    "Core": ["All", "Abs", "Obliques"],
};

const ellipses = document.querySelectorAll('.ellipse');

/**
 * Add an event listener to each ellipse
 */
ellipses.forEach(ellipse => {
    ellipse.addEventListener('click', () => {
        let muscleGroupName = getMuscleGroup(ellipse.id);
        popup(muscleGroupName);
    });
});

/**
 * This function maps the ellipse id to the muscle group name.
 * @param {*} elipseId 
 * @returns string of the muscle group name.
 */
function getMuscleGroup(elipseId) {
    let muscleGroupName = " ";
    switch (elipseId) {
        case 'ellipse-1':
            muscleGroupName = Object.keys(muscleGroups)[0];
            break;
        case 'ellipse-2':
            muscleGroupName = Object.keys(muscleGroups)[1];
            break;
        case 'ellipse-3':
            muscleGroupName = Object.keys(muscleGroups)[2];
            break;
        case 'ellipse-4':
            muscleGroupName = Object.keys(muscleGroups)[3];
            break;
        case 'ellipse-5':
            muscleGroupName = Object.keys(muscleGroups)[4];
            break;
        case 'ellipse-6':
            muscleGroupName = Object.keys(muscleGroups)[5];
            break;
        case 'ellipse-7':
            muscleGroupName = Object.keys(muscleGroups)[6];
            break;
        case 'ellipse-8':
            muscleGroupName = Object.keys(muscleGroups)[7];
            break;
    default:
        muscleGroupName = "Error muscle group is not in the list";
        break;
    }
    return muscleGroupName;
}

/**
 * This function creates a popup that displays the muscle group name and the muscles in the
 * muscle group object. The popup also contains buttons that generate information, workout, 
 * and generateStretchButton.
 * 
 * @param {*} muscleGroupName 
 */
function popup(muscleGroupName) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const closeButton = document.getElementById('closePopup');
    const generateInformationButton = document.getElementById('popup-generate-information');
    const generateWorkoutButton = document.getElementById('popup-generate-workout');
    const generateStretchButton = document.getElementById('popup-generate-stretch');
    const muscleSelectionOptions = document.getElementById('popup-dropdown');
    
    muscleSelectionOptions.innerHTML = "";
    muscleGroups[muscleGroupName].forEach(muscle => {
        const option = document.createElement('option');
        option.value = muscle;
        option.innerHTML = muscle;
        muscleSelectionOptions.appendChild(option);
    });
    
    // Open the popup
    popup.style.display = 'flex'; // Show the popup
    popup.style.zIndex = 99999; // Bring the popup to the front
    popupTitle.innerHTML = muscleGroupName; // Set the title of the

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
