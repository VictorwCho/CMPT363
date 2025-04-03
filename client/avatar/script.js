/**
 * The muscle groups and their respective muscles
 */
const muscleGroups = {
    "Chest": ["Upper Chest", "Lower Chest"],
    "Upper Arms": ["Biceps", "Triceps", "Forearms"],
    "Back": ["Lats", "Traps", "Rhomboids"],
    "Shoulders": ["Deltoids", "Rotator Cuff"],
    "Lower Arms": ["Flexors", "Extensors"],
    "Lower Legs": ["Calves", "Shins"],
    "Upper Legs": ["Quads", "Hamstrings", "Glutes"],
    "Core": ["Abs", "Obliques"],
};

const URL = 'https://localhost:3001'
const ellipses = document.querySelectorAll('.ellipse');
const generateInformationButton = document.getElementById('generate-information');
const generateWorkoutButton = document.getElementById('generate-workout');
const errorMessageServer = 
    `We’re sorry! The server encountered an issue and is currently unavailable. Please try again later.\n\nIf the problem persists, contact support or check our status page at www.support.com for updates.`
const errorMessageFailedRetrieval = 
    `We’re unable to retrieve information from the server at the moment. This may be due to a network issue or server downtime. Please check your internet connection and try again.\n\nIf the issue persists, contact support or visit our status page at www.support.com for updates.`
const helpMessage = 
    `Click on the blue dots to open a popup window. From there, you can select and add muscles to generate detailed information.\n\nIf you're unsure which muscles to choose, hover over the blue dots for descriptions or consult the guide for further assistance.`

var myMuscles = [];

/**
 * Add an event listener to each ellipse
 */
ellipses.forEach(ellipse => {
    const elipseId = document.getElementById(ellipse.id);
    elipseId.addEventListener('mouseover', () => {
        elipseId.style.cursor = 'pointer';
        elipseId.style.transform = 'scale(1.7)';
        elipseId.style.transition = 'transform 0.3s ease-in-out';
        const muscleGroupName = getMuscleGroup(ellipse.id);
        showHoverMessage(muscleGroupName, ellipse);
    });

    elipseId.addEventListener('mouseout', () => {
        elipseId.style.cursor = 'default';
        elipseId.style.transform = 'scale(1)';
        hideHoverMessage();
    });

    ellipse.addEventListener('click', () => {
        let muscleGroupName = getMuscleGroup(ellipse.id);
        popup(muscleGroupName);
    });
});

function showHoverMessage(message, target) {
    const hoverMessage = document.createElement('div');
    hoverMessage.id = 'hover-message';
    hoverMessage.innerText = message;
    hoverMessage.style.position = 'absolute';
    hoverMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    hoverMessage.style.color = 'white';
    hoverMessage.style.padding = '5px 10px';
    hoverMessage.style.borderRadius = '5px';
    hoverMessage.style.fontSize = '12px';
    hoverMessage.style.zIndex = '1000';
    hoverMessage.style.fontFamily = 'Inter, Helvetica';
    // Position the message near the ellipse
    const rect = target.getBoundingClientRect();
    hoverMessage.style.top = `${rect.top - 30}px`; // Position above the ellipse
    hoverMessage.style.left = `${rect.left + rect.width / 2 - 50}px`; // Center horizontally

    document.body.appendChild(hoverMessage);
}

function hideHoverMessage() {
    const hoverMessage = document.getElementById('hover-message');
    if (hoverMessage) {
        hoverMessage.remove();
    }
}

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
        container.appendChild(label);
        container.appendChild(input);
        
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

function generateWorkoutPromptTemplate() {
    let muscleList = myMuscles.join(', ');
    let string = 
    `
    "Generate beginner-friendly workout plans based on an array of selected muscle groups.
    For each muscle group in the array:[${muscleList}]\n
    - Group the exercises under the respective muscle group.
    \n- Provide clear and concise explanations for how to perform each exercise, with instructions 
    as numbered steps.\n- Specify the number of sets and repetitions per set for each exercise.
    \n- Ensure the workouts are designed for beginners—quick to read and easy to understand.
    \n\nFormat the response in JSON with the following structure:
    \n{\n  \"muscle_groups\": 
    [\n    {\n      \"muscle_group\": \"string\",\n      
    \"workouts\": [\n        {\n          \"exercise_name\": \"string\",\n          
    \"instructions\": [\n            \"1. Step 1 explanation goes here.\",\n            
    \"2. Step 2 explanation goes here.\",\n            
    \"3. Step 3 explanation goes here.\"\n          ],\n          
    \"sets\": number,\n          
    \"repetitions_per_set\": number\n        }\n      ]\n    }\n  ]\n}\n
    Ensure the response adheres to the specified JSON format, allowing for multiple muscle 
    groups in the array, and includes numbered steps in the instructions for clarity."
    `
    return string;
}

function generateInformationPromptTemplate() {
    let muscleList = myMuscles.map((muscle, index) => `${index + 1}. [${muscle}]`).join('\n');
    let string =
    `Tell me about these muscles in a specific format: 
        ${muscleList}

    **For each muscle:**
    Provide the information in JSON format, structured for beginners and avoiding overly technical terms. Use the following template:
    {
    "muscles": [
        {
        "name": "string", // Name of the muscle
        "function": "string", // What does it do? (Beginner-friendly explanation)
        "location": "string" // Where is it? (Simple description of its location)
        }
    ]
    }
    Ensure the response adheres to this JSON format and includes clear, concise, and beginner-friendly explanations for the muscles listed in the input.`
    return string;
}

generateWorkoutButton.addEventListener('click', async () => {
    if (myMuscles.length === 0) {
        alert(`${helpMessage}`);
        return
    }

    const requestBody = {
        "contents": [{
            "parts":[{"text": `${generateWorkoutPromptTemplate()}`}]
        }]
    }

    // Show the loading bar
    const loadingBar = document.getElementById('loading-bar');
    loadingBar.style.width = '0%';
    const loadingBarContainer = document.getElementById('loading-container');
    loadingBarContainer.style.display = 'flex';
    const section = document.getElementById('section-avatar');
    
    try {
        section.style.display = 'none';
        let loadingBarProgress = 0;
        const interval = setInterval(() => {
            if (loadingBarProgress < 90) {
                loadingBarProgress += 10;
                loadingBar.style.width = `${loadingBarProgress}%`;
            }
        }, 250);// update every 250ms

        const response = await fetch(`${URL}/generate-workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        clearInterval(interval);

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data);
            console.log('Workout generated successfully!');
            
            loadingBarContainer.style.display = 'none';
            setTimeout(() => {
                window.location.href = 'workout.html';
            }, 1000);
        } else {
            console.error('Error:', response.statusText);
            console.log('Failed to generate workout.');
            alert(`{errorMessageFailedRetrieval}`);
            loadingBarContainer.style.display = 'none';
            section.style.display = 'flex';
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred while generating workout.');
        alert('${errorMessageServer}');
        loadingBarContainer.style.display = 'none';
        section.style.display = 'flex';
    }
});

/**
 * Generate information
 */
generateInformationButton.addEventListener('click', async () => {
    if (myMuscles.length === 0) {
        alert(`${helpMessage}`);
        return
    }
    const requestBody = {
        "contents": [{
            "parts":[{"text": `${generateInformationPromptTemplate()}`}]
            }]
        }

    // Show the loading bar
    const loadingBar = document.getElementById('loading-bar');
    loadingBar.style.width = '0%';
    const loadingBarContainer = document.getElementById('loading-container');
    loadingBarContainer.style.display = 'flex'; // Show the loading bar container
    const section = document.getElementById('section-avatar');

    try {
        section.style.display = 'none'; // Hide the section content
        let loadingBarProgress = 0;
        const interval = setInterval(() => {
            if (loadingBarProgress < 90) {
                loadingBarProgress += 10;
                loadingBar.style.width = `${loadingBarProgress}%`;
            }
        }, 250);// update every 250ms

        const response = await fetch(`${URL}/generate-information`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        clearInterval(interval); // Clear the interval when the request is complete

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data);
            console.log('Information generated successfully!');

            loadingBar.style.width = '100%'; // Set the loading bar to 100%
            setTimeout(() => {
                window.location.href = 'information.html';
            }, 1000); // Redirect after 1000ms
        } else {
            console.error('Error:', response.statusText);
            console.log('Failed to generate information.');
            alert(`${errorMessageFailedRetrieval}`);
            loadingBarContainer.style.display = 'none'; // Hide the loading bar
            section.style.display = 'flex'; // Show the main content again
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred while generating information.');
        alert(`${errorMessageServer}`);
        loadingBarContainer.style.display = 'none'; // Hide the loading bar
        section.style.display = 'flex'; // Show the main content again
    }
});
