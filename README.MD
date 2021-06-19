# Soccer App

## This is a replica of the FIFA 21 Ultimate Team game API that allows you to search for players and teams.

### Steps to run it

- clone the repository.
- install npm modules with the command "npm install" inside each of the two foldes: back_end and front_end
- run the script.js to get dataset from API with the command "npm run script" inside back_end folder. This may take several minutes because there are 908 pages (It will be finished when the console shows page number 908). The data is stored on mongoDB and it can be accessed by the URL connection: "mongodb://localhost:27017/test".
- run the backend inside back_end folder with the command npm start. It's available on port 5000.
- run the frontend inside front folder with the command npm start. It's available on port 3000.
- check the players and search by teams on localhost:3000.
