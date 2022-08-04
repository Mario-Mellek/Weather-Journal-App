/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key and base url for OpenWeatherMap API.
let apiKey = '&appid=8e2b6e81e6a1375344f684b58f2f8136&units=metric';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';


// Event listener to add function to the generate button upon clicking.
document.getElementById('generate').addEventListener('click', generate);

/* Function generate() called by event listener. 
-defining the variables zipCode and feelings using .value property.
-Calling the async function (weather()) defined at line 38 with the parameters (baseURL, apiKey) defined globally and (zipCode) defined locally. 
-.then() method is used to execute the arrow function with the parameter (data) returned from the weather function.
-conditional statment to check and display an alert if there are any error messages received from the API, 
if not, it defines the variables below fetched from the API and packages them in the object `gatheredData` to POST it to the server.
-calling the async POST request function (serverPost()) defined at line 55 to send the data to the server on the url extension /add.
-calling the async GET request function defined at line 71 to get and update the data in the user interface.*/
function generate(){
    const zipCode= document.getElementById('zip').value;
    const feelings= document.getElementById('feelings').value;
    weather(baseURL, zipCode, apiKey)
    .then((data)=>{ 
        if (data.message!=undefined) {
        alert(data.message);
    }else{
        const temprature= Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const description= data.weather[0].description;
        const city= data.name;
        const gatheredData= {temprature, icon, description ,city, newDate, feelings};
        serverPost('/add', gatheredData);
        serverGet();
    };   
    });
};



/*Async function to GET Web API Data. 
-the function has 3 parameters (url, code, key) to build the API query.
-Defining the variable response that is fetched from the API using the await operator.
-Using Try and catch to define and return the variable 'data' (if resolved succesfully) after awaiting for parsing the body text as JSON using the .then() method.*/
const weather= async (url, code, key)=>{
    const response = await fetch(url+ code+ key);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('watch out', error);
    }
};



/*Async Function to POST gatheredData. 
-The function adds an entry to the project endpoint.
-First parameter is the URL to make the POST request to, and second parameter is the gatheredData object.
-method is set to POST because we are accessing the POST route setup in server.js.
-credentials and headers are boilerplate necessary for a successful POST request.
-Content-Type is set to json and the body option converts the object into a JSON string using the JSON.stringify()method.
using try and catch to define and return the variable newData.
*/
const serverPost= async(url='',gatheredData={})=>{
    const response= await fetch(url, {
        method: 'POST',
        credentails: 'same-origin',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(gatheredData)
    });
    try {
        const newData= await response.json();
        return newData;
    } catch (error) {
        console.log('watch out', error);
    }
};



/*Async Function to GET Project Data and update user interface.
-The function retrieves the data with a GET request to the /all path.
-the innerHTML property of DOM elements are dynamically set according to data returned by the app route.
*/
const serverGet= async()=>{
    const request= await fetch('/all');
    try {
        const returnedData= await request.json();
        console.log('HYG', returnedData);
        document.querySelector('.card').style.cssText= 'opacity: 1; transition: all 800ms;';
        document.getElementById('temp').innerHTML = `<h1>${returnedData.temprature}&#8451;</h1>`;
        document.getElementById('feeling').innerHTML = returnedData.feelings;
        document.getElementById('date').innerHTML = `<p> Date: ${returnedData.newDate} </p>`;
        document.getElementById('city').innerHTML= returnedData.city;
        document.getElementById('icon').innerHTML= `<img src="https://openweathermap.org/img/wn/${returnedData.icon}@2x.png" alt="icon">`;
        document.getElementById('description').innerHTML=`<span> ${returnedData.description} </span>`;
    } catch (error) {
        console.log('watch out', error);
    };
};


/* References used:
-https://dmitripavlutin.com/javascript-fetch-async-await/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
https://www.codecademy.com/learn/fscp-async-javascript-and-http-requests/modules/fecp-learn-javascript-requests/cheatsheet
https://www.w3schools.com/js/js_async.asp
*/