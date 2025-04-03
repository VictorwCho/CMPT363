require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const e = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiKey = process.env.GOOGLE_API_KEY;

// Load SSL/TLS certificates
const options = {
    key: fs.readFileSync('certificates/private-key.pem'), // Path to your private key
    cert: fs.readFileSync('certificates/certificate.pem') // Path to your certificate
};

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the root endpoint!');
});

// /generate information endpoint
let generatedInformationData = [];
let generatedWorkoutData = [];
app.post('/generate-information', (req, res) => {
    const requestData = req.body; // Automatically parsed by express.json()

    // Define the Google API endpoint and your API key
    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Make the POST request to the Google API
    const apiReq = https.request(options, apiRes => {
        let apiResponseData = '';
        apiRes.on('data', chunk => {
            apiResponseData += chunk;
        });

        apiRes.on('end', () => {
            res.status(apiRes.statusCode).json(JSON.parse(apiResponseData)); // Forward the API response
            try {
                const parsedResponse = JSON.parse(apiResponseData);
                console.log(parsedResponse);
                const content = parsedResponse["candidates"][0]["content"]["parts"][0]["text"];
                const cleanedData = content.replace(/```json\n|```/g, '');
                const parsedData = JSON.parse(cleanedData);
                generatedInformationData.push(parsedData);
                console.log("Push successful:", parsedData);
            } catch (error) {
                console.error('Error parsing JSON and storin:', error);
            }
        });
    });

    apiReq.on('error', error => {
        res.status(500).json({ error: error.message });
    });

    // Send the request body to the Google API
    apiReq.write(JSON.stringify(requestData));
    apiReq.end();
});

app.get('/last-generated-information', (req, res) => {
    let end = generatedInformationData.length;
    res.status(200).json(generatedInformationData[end-1]);
});

app.get('/generate-information-history', (req, res) => {
    let generatedInformationMinusEnd = generatedInformationData.slice(0, -1);
    res.status(200).json(generatedInformationMinusEnd);
    console.log("contents of information\n");
    console.log(generatedInformationMinusEnd);
});

// generate workout endpoint
app.post('/generate-workouts', (req, res) => {
    const requestData = req.body; // Automatically parsed by express.json()

    // Define the Google API endpoint and your API key
    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Make the POST request to the Google API
    const apiReq = https.request(options, apiRes => {
        let apiResponseData = '';
        apiRes.on('data', chunk => {
            apiResponseData += chunk;
        });

        apiRes.on('end', () => {
            res.status(apiRes.statusCode).json(JSON.parse(apiResponseData)); // Forward the API response
            try {
                const parsedResponse = JSON.parse(apiResponseData);
                const content = parsedResponse["candidates"][0]["content"]["parts"][0]["text"];
                let cleanedData = content.replace(/```json\n|```/g, '');
                let parsedData = JSON.parse(cleanedData);
                generatedWorkoutData.push(parsedData);
                console.log("Push successful:", parsedData);
            } catch (error) {
                console.error('Error parsing JSON and storin:', error);
            }
        });
    });

    apiReq.on('error', error => {
        res.status(500).json({ error: error.message });
    });

    // Send the request body to the Google API
    apiReq.write(JSON.stringify(requestData));
    apiReq.end();
});

app.get('/all-generated-workouts', (req, res) => {
    res.status(200).json(generatedWorkoutData);
    console.log("contents of workout\n");
    console.log(generatedWorkoutData);
});

    
// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}/`);
});