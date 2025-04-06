const URL = 'https://localhost:3001';
const workoutContainer = document.getElementById('workout-container');

/**
 * * * * Function to fetch all generated workouts from the server and display them
 */
onload = async () => {
    const response = await fetch(`${URL}/all-generated-workouts`);
    const data = await response.json();
    iterateThroughWorkoutData(data);
}

/**
 * Function to iterate through the workout data and create cards for each muscle group
 * @param {*} data 
 */
function iterateThroughWorkoutData(data) {
    const groupedData = {};
    data.forEach(entry => {
        entry.muscle_groups.forEach(muscleGroup => {
            const groupName = muscleGroup.muscle_group;

            // If the muscle group doesn't exist in groupedData, initialize it
            if (!groupedData[groupName]) {
                groupedData[groupName] = [];
            }

            // Add workouts to the muscle group
            groupedData[groupName] = groupedData[groupName].concat(muscleGroup.workouts);
        });
    });

    // Create cards for each unique muscle group
    Object.keys(groupedData).forEach(muscleGroupName => {
        const muscleCard = createWorkoutCard(muscleGroupName);

        groupedData[muscleGroupName].forEach(workout => {
            const workoutInformation = createWorkoutInformation(
                muscleGroupName,
                workout.exercise_name,
                workout.instructions,
                workout.sets,
                workout.repetitions_per_set
            );
            muscleCard.appendChild(workoutInformation);
        });
        workoutContainer.appendChild(muscleCard);
    });
}

/**
 * Function to create a workout card for each muscle group
 * @param {*} muscle 
 * @returns {HTMLElement} - The created workout card element
 */
function createWorkoutCard(muscle) {
    const card = document.createElement('section');
    let formatedString = muscle.replace(/ /g, '-').toLowerCase();
    card.classList.add(`${formatedString}-workout-card`);
    
    const title = document.createElement('h2');
    let titleString = captializeFirstLetter(muscle);
    title.innerHTML = `${titleString} Workouts`;

    card.appendChild(title);
    
    return card;
}

/**
 * Helper function to capitalize the first letter of a string
 * @param {*} string 
 * @returns {string} - The string with the first letter capitalized
 */
function captializeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Show a hover message when the user hovers over the refresh icon
 * @param {*} message 
 * @param {*} target 
 */
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
    // Position the message near the icon
    const rect = target.getBoundingClientRect();
    hoverMessage.style.top = `${rect.top - 35}px`; // Position above the icon
    hoverMessage.style.left = `${rect.left + rect.width / 2 - 50}px`; // Center horizontally

    document.body.appendChild(hoverMessage);
}

/**
 * * Hide the hover message when the user moves the mouse away from the icon
 */
function hideHoverMessage() {
    const hoverMessage = document.getElementById('hover-message');
    if (hoverMessage) {
        hoverMessage.remove();
    }
}

/**
 * Create workout information for each exercise
 * @param {*} muscleGroupName 
 * @param {*} exerciseName 
 * @param {*} instructions 
 * @param {*} sets 
 * @param {*} reps 
 * @returns {HTMLElement} - The created workout information element
 */
function createWorkoutInformation(muscleGroupName, exerciseName, instructions, sets, reps) {
    const description = document.createElement('article');
    description.classList.add('workout-card-information');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    
    const title = document.createElement('h3');
    title.innerText = exerciseName;

    const img = document.createElement('img');
    img.classList.add('refresh-icon');
    img.src = "assets/icon/refresh.png";
    img.alt = "Refresh Icon";
    img.width = "24";
    img.height = "24";

    img.addEventListener('click', () => {
        alert("Under Construction");
    });

    img.addEventListener('mouseover', () => {
        img.style.cursor = 'pointer';
        img.style.transform = 'scale(1.5)';
        img.style.transition = 'transform 0.3s ease-in-out';
        const message = "Regenerate Workout";
        showHoverMessage(message, img);
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
        hideHoverMessage();
    });
    

    const instructionLabel = document.createElement('label');
    instructionLabel.setAttribute('for', 'instruction');
    instructionLabel.innerText = 'Instructions:';

    const instructionTitle = document.createElement('p');
    instructionTitle.innerText = 'Instructions:';

    const instructionContainer = document.createElement('div');
    instructionContainer.classList.add('instruction-container');

    instructions.forEach(step => {
        const instruction = document.createElement('p');
        instruction.innerText = step;
        instructionContainer.appendChild(instruction);
    });

    const set = document.createElement('p');
    set.innerText = `Sets: ${sets}`;

    const rep = document.createElement('p');
    rep.innerText = `Repetitions: ${reps}`;

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-container';

    const removeWorkoutButton = document.createElement('button');
    removeWorkoutButton.classList.add('remove-workout-button');
    removeWorkoutButton.innerText = 'Remove Workout';

    const completeWorkoutButton = document.createElement('button');
    completeWorkoutButton.classList.add('complete-workout-button');
    completeWorkoutButton.innerText = 'Complete Workout';
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(img);
    description.appendChild(titleContainer);
    description.appendChild(instructionLabel);
    description.appendChild(instructionContainer);
    description.appendChild(set);
    description.appendChild(rep);
    buttonContainer.appendChild(removeWorkoutButton);
    buttonContainer.appendChild(completeWorkoutButton);
    description.appendChild(buttonContainer);
    completeWorkoutButton.addEventListener('click', () => {
        description.remove();
        let id = muscleGroupName.replace(/ /g, '-').toLowerCase();
        let workoutCard = document.querySelector(`.${id}-workout-card`);
        if (workoutCard) {
            let workoutInformation = workoutCard.querySelectorAll('.workout-card-information');
            if (workoutInformation.length === 0) {
                workoutCard.remove();
            }
        }
    });

    removeWorkoutButton.addEventListener('click', () => {
        description.remove();
        let id = muscleGroupName.replace(/ /g, '-').toLowerCase();
        let workoutCard = document.querySelector(`.${id}-workout-card`);
        if (workoutCard) {
            let workoutInformation = workoutCard.querySelectorAll('.workout-card-information');
            if (workoutInformation.length === 0) {
                workoutCard.remove();
            }
        }
    });
    return description;
}

