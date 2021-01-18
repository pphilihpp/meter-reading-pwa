# meter-reading-pwa

## Backend 
### required basic configuration for backend Server - do this in the backend folder!
### 1 Step
npm init
### 2 Step
npm install body-parser dotenv nodemon axios express
### 3 Step
Create an Folder vars with the file .env
#### .env
API_USERNAME=XXXXX
API_PASSWORD=XXXXX
PORT=3000
API_URL=https://cos.bpc.ag/portal

##Frontend
###1 Step
npm install (to install dependencies) in the meter-reading-pwa folder
###2 Step
create .env file within meter-reading-pwa
###3 Step
REACT_APP_API_USERNAME=XXXXX
REACT_APP_API_PASSWORD=XXXXX
REACT_APP_PORT=3000
REACT_APP_API_URL=https://cos.bpc.ag/portal --> change to http://localhost:3000/login when working with BE

##Working with BE & FE
start BE Server at Port 3000 with npm start in the backend folder
start FE server at any other Port (most commonly 3001). You will get the msg that a server is running on Port 300 and you have to confirm with y to start the server at another Port.
