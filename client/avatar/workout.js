const URL = 'https://localhost:3001';
const workoutContainer = document.getElementById('workout-container');

/*
    Server retrieves information do i want to retrieve the last one or all?
    i need to retrieve all the information
*/
onload = async () => {
    const response = await fetch(`${URL}/all-generated-workout`);
    const data = await response.json();
    iterateThroughWorkoutData(data);
}

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

function createWorkoutCard(muscle) {
    const card = document.createElement('section');
    card.classList.add(`${muscle}-workout-card`);
    card.classList.add('workout-card');
    
    const title = document.createElement('h2');
    let titleString = captializeFirstLetter(muscle);
    title.innerHTML = `${titleString} Workouts`;

    card.appendChild(title);
    
    return card;
}

function captializeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createWorkoutInformation(exerciseName, instructions, sets, reps) {
    const description = document.createElement('article');
    description.classList.add('workout-card-information');

    const title = document.createElement('h3');
    title.innerText = exerciseName;

    const instructionLabel = document.createElement('label');
    instructionLabel.setAttribute('for', 'instruction');
    instructionLabel.innerText = 'Instructions:';

    const instructionTitle = document.createElement('p');
    instructionTitle.innerText = 'Instructions:';

    const instruction = document.createElement('p');
    instruction.innerText = `${instructions}`;

    const set = document.createElement('p');
    set.innerText = `Sets: ${sets}`;

    const rep = document.createElement('p');
    rep.innerText = `Repetitions: ${reps}`;

    const removeWorkoutButton = document.createElement('button');
    removeWorkoutButton.innerText = 'Remove Workout';

    description.appendChild(title);
    description.appendChild(instructionLabel);
    description.appendChild(instruction);
    description.appendChild(set);
    description.appendChild(rep);
    description.appendChild(removeWorkoutButton);
    removeWorkoutButton.addEventListener('click', () => {
        description.remove();
    });
    return description;
}

