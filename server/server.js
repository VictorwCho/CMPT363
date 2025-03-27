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

// /generate endpoint
let generatedData = [];
app.post('/generate', (req, res) => {
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
                generatedData.push(content);
                console.log("Push successful:", content);
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

app.get('/generated', (req, res) => {
    let end = generatedData.length;
    res.status(200).json(generatedData[end-1]);
});

app.get('/generatedAll', (req, res) => {
    res.status(200).json(generatedData);
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}/`);
});