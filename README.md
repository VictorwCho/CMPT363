CMPT363

Implemented
*** Index.html***
Main Page
- Generate Information
- Generate Workout
- AI Chat Feature (Bottom Nav bar)

Data To Be Entered
- Blue dots can be clicked to add specific muscles into the muscle list by clicking the add button

*** Information.html***
After Clicking Generate Information
- Clicking "Remove Workout" and "Complete Workout" will remove the  HTML workout element

*** Workout.html***
After Clicking Generate Work-out
- Clicking "Remove Workout" and "Complete Workout" will remove the  HTML workout element

*** helpbut.html*** 
After clicking the AI button
- Typing messages will simmulate AI chat feature


Pre-requirements:
- vscode
- Live Server Extension : https://github.com/ritwickdey/vscode-live-server
- Node.js version v22.14.0 or equivalent

Steps to Start the environment
1. Downloading files
    a. Download and unzip the folder from canvas
2. Ensure node is installed and navigate to the server directory
    eg */*/server
    2.1. open the terminal and type "npm install".
        A node_modules folder should appear
3. In the server directory run the server in the terminal by typing "node server.js".
    3.1 "Server running on https://localhost:3001/" should appear if the server is successfully run.
4. Open index.html with Live Server

Contact vca56@sfu.ca for concerns or issues.
    

File Structure:
root/
|-- client/
|   |-- avatar/
|       |-- assets/
|           |-- avatar-female/
|               |-- *.png
|           |-- icon/
|               |-- *.png
|       |-- avatar-css/
|           |-- *.css
|       |-- *.html
|       |-- *.css
|       |-- *.js
|-- server/
|   |-- certificates/
|       |-- *.csr
|       |-- *.pem
|   |-- node_modules/
|   |-- .env
            