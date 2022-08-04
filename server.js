/* Empty JS object to act as endpoint for all routes */
projectData = {};

/*
-Requiring express after installing it from the terminal.
-Starting an instance of the app using express.
*/
const express = require('express');
const app = express();

/*
Dependencies.  
Requiring and Connecting the packages (Body-Parser and CORS) installed on the command line to the app with the `require() function` and `.use() method`.
*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder 
pointing to the website folder with .html, .css, and .js files.
*/
app.use(express.static('website'));

// Spin up the server
const port = 8000;

const server = app.listen(port, ()=>{
    console.log(`running on localhost:${port}`);
})

//creating the GET route
// Callback function to complete GET '/all'
app.get('/all',(request, response)=>{
    response.send(projectData);
});

//creating the POST route
app.post('/add',(request,response)=>{
    projectData= request.body;
    console.log('posted successfully',projectData);
});
