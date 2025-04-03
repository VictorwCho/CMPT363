const URL = 'https://localhost:3001'
const body = document.getElementById("sandbox");
const here = document.getElementById("here");
let string = "";
// const submitButton = document.getElementById('submit-user-response');

// Function to display text letter by letter
async function displayTextLetterByLetter(element, text, delay = 10) {
    element.innerHTML = ``; // Clear the element's content
    for (const letter of text) {
        if (letter === '\n') {
            element.innerHTML += '<br>'; // Add a line break for '\n'
        } else {
            element.innerHTML += letter; // Add the letter to the element
        }
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the delay
    }
}

const p = document.createElement('p');
onload = async () => {
    const response = await fetch(`${URL}/last-generated-information`);
    const data = await response.json();
    let information = data.muscles;
    console.log(information);
    // const informationContainer = document.getElementById('information-container');
    const informationContainer = document.getElementById('sandbox');
    const informationItem = document.createElement('article');
    informationItem.className = 'information-item';

    information.forEach((item) => {
        let titleFunction = `${Object.keys(item)[1]}`;
        titleFunction = captializeFirstLetter(titleFunction);
        
        let titleLocation = `${Object.keys(item)[2]}`;
        titleLocation = captializeFirstLetter(titleLocation);

        let functionDescription = `${item.function}`;
        let locationDescription = `${item.location}`;

        let stringBuilder = `
        ${item.name}\n
        ${titleFunction}:\n${functionDescription}\n
        ${titleLocation}:\n${locationDescription}\n
        `;

        string += stringBuilder;
    });
    informationContainer.appendChild(informationItem);
    informationItem.appendChild(p);

    // Display the text word by word
    await displayTextLetterByLetter(p, string);

}

// submitButton.addEventListener('click', () => {
//     const userResponse = document.getElementById('user-input');
//     let string = userResponse.value
//     userResponse.value = ''; // Clear the input field

//     const article = document.createElement('article');
//     article.className = 'user-message';

//     const pElement = document.createElement('p');
//     pElement.innerHTML = string + "<br> This feature is under construction";

//     article.appendChild(pElement);
//     const placeholder = document.getElementsByClassName('scrollable');
//     placeholder[0].appendChild(article);

// });



function captializeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const viewHistory = document.getElementById('sandbox-button');
viewHistory.addEventListener('click', async () => {
    const response = await fetch(`${URL}/generate-information-history`);
    const data = await response.json();

    let information = data;
    console.log(information);
    // const informationContainer = document.getElementById('information-container');
    const informationContainer = document.getElementById('sandbox-all');
    const informationItem = document.createElement('article');
    informationItem.className = 'information-sandbox-all';

    information.forEach((item) => {
        item.muscles.forEach((muscle) => {
            let titleFunction = `${Object.keys(muscle)[1]}`;
            titleFunction = captializeFirstLetter(titleFunction);
            
            let titleLocation = `${Object.keys(muscle)[2]}`;
            titleLocation = captializeFirstLetter(titleLocation);

            let functionDescription = `${muscle.function}`;
            let locationDescription = `${muscle.location}`;

            let stringBuilder = `<br>
            ${muscle.name}<br><br>
            ${titleFunction}:<br>${functionDescription}<br><br>
            ${titleLocation}:<br>${locationDescription}<br>
            `;

            string += stringBuilder;
        });


    });
    informationContainer.appendChild(informationItem);
    here.innerHTML = "";
    here.innerHTML = string;
    informationItem.appendChild(here);

    // here.appendChild(informationContainer);
});
