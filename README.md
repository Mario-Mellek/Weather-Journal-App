# Weather-Journal App Project
### Description.
- Asynchronous web app that uses openweathermap Web API and user data to dynamically update the UI. 
##### Node.js dependencies: 
   - Express
   - Body-Parser
   - CORS
# Features
- The app records the user's entry, generates the date and fetches the weather data using an asynchronous `GET` request to the openweathermap API.
- All of the gathered data are sent to the server using an asynchronous `POST` request.
- Produce a feedback to the Command line indicating that the `POST` request is successful. 
- Lastly, the data is retrieved from the server using an asynchronous `GET` request to display the date, user's entry and the weather on the UI.    