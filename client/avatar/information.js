const URL = 'https://localhost:3001'
const body = document.getElementById("sandbox");
const here = document.getElementById("here");

// Function to display text letter by letter
async function displayTextLetterByLetter(element, text, delay = 10) {
    element.innerHTML = ''; // Clear the element's content
    for (const letter of text) {
        element.innerHTML += letter; // Add the letter to the element
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the delay
    }
}

onload = async () => {
    const response = await fetch(`${URL}/last-generated-information`);
    const data = await response.json();
    const p = document.createElement('pre');
    p.innerHTML = data;
    body.appendChild(p);

    // Display the text word by word
    await displayTextLetterByLetter(p, data);
}

const viewHistory = document.getElementById('sandbox-button');
viewHistory.addEventListener('click', async () => {
    const response = await fetch(`${URL}/generated-information-history`);
    const data = await response.json();
    const history = document.createElement('history');
    data.forEach((item) => {
        const p = document.createElement('pre');
        p.innerHTML = item;
        history.appendChild(p);
    });
    here.appendChild(history);
});
