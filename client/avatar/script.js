/**
 * The muscle groups and their respective muscles
 */
const muscleGroups = {
    "Chest": ["Upper Chest", "Lower Chest"],
    "Upper Arms": ["Biceps", "Triceps", "Forearms"],
    "Back": ["Lats", "Traps", "Rhomboids" ],
    "Shoulders": ["Deltoids", "Rotator Cuff"],
    "Lower Arms": ["Flexors", "Extensors"],
    "Lower Legs": ["Calves", "Shins"],
    "Upper Legs": ["Quads", "Hamstrings", "Glutes"],
    "Core": ["Abs", "Obliques"],
};

const URL = 'https://localhost:3001'
const ellipses = document.querySelectorAll('.ellipse');
const generateInformationButton = document.getElementById('generate-information');
var myMuscles = [];

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
    const muscleSelectionOptions = document.getElementById('popup-options');
    const popupAddButton = document.getElementById('popup-button-add');
    
    // Clear the muscle selection options and add the muscles as options
    muscleSelectionOptions.innerHTML = "";
    muscleGroups[muscleGroupName].forEach(muscle => {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = muscle;
        input.value = muscle;
        input.innerHTML = muscle;
        input.checked = false;

        if (myMuscles.includes(muscle)) {
            input.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor
        label.innerHTML = muscle;
        
        const container = document.createElement('div');
        container.id = "popup-container";
        container.appendChild(input);
        container.appendChild(label);
        
        muscleSelectionOptions.appendChild(container);
    });

    popupAddButton.addEventListener('click', () => {
        muscleGroups[muscleGroupName].forEach(muscle => {
            const checkbox = document.getElementById(muscle);
            if (checkbox == null) {
                return;
            }
            if (checkbox.checked && !myMuscles.includes(muscle)) {
                myMuscles.push(muscle);
            } else if (!checkbox.checked) {
                myMuscles = myMuscles.filter(item => item !== muscle);
            }
        });
    
        // Update the muscle list and close the popup
        populateMuscleList();
        popup.style.display = 'none';
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

function populateMuscleList() {
    const muscleList = document.getElementById('muscle-list-content');
    muscleList.innerHTML = "";
    myMuscles.forEach(muscle => {
        const p = document.createElement('p');
        p.innerHTML = muscle;

        const button = document.createElement('button');
        button.innerHTML = "X";

        const container = document.createElement('div');
        container.id = "muscle-list-container";
        container.appendChild(p);
        container.appendChild(button);

        muscleList.appendChild(container);

        button.addEventListener('click', () => {
            myMuscles = myMuscles.filter(item => item !== muscle);
            populateMuscleList();
        });
    });
}

function generateInformationPromptTemplate() {
    let muscleList = myMuscles.map((muscle, index) => `${index + 1}. [${muscle}]`).join('\n');
    let string =
    `Tell me about these muscles in a specific format:
    ${muscleList}
    **For each muscle:**
    - Format each entry as follows:
    - **Name**: [Muscle Name]
    - **Function**: [What does it do?]
    - **Location**: [Where is it?]
    Make sure the response is properly formatted using markdown headers and bullet points.`;
    return string
}

generateInformationButton.addEventListener('click', async () => {
    if (myMuscles.length === 0) {
        alert('Please select at least one muscle to generate information by clicking on the blue circle.');
        return
    }
    const requestBody = {
        "contents": [{
            "parts":[{"text": `${generateInformationPromptTemplate()}`}]
            }]
        }

    try {
        const response = await fetch(`${URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data);
            console.log('Information generated successfully!');
            window.location.href = 'sandbox.html';
        } else {
            console.error('Error:', response.statusText);
            console.log('Failed to generate information.');
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred while generating information.');
    }
});
