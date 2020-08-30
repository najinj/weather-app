## Application Description 
This project is a simple weather app using ReactJs and Redux for state management 
we are feching data from https://openweathermap.org/api API  

This app uses the Geo-location of the user to display the weather forcast so make sure you enable location sharing , in case the user refuse sharing locating a message would be displayed asking the user to enable it.

The landing or homepage displays a list of weather prodictions for the next 7 days, with a min and max temperature and an icon for visual representation
the Icon displayed is also apart from the openweathermap API.

![image](https://user-images.githubusercontent.com/29644684/91648244-f6feb580-ea5c-11ea-9dec-42335bcac49c.png)

The application also provides a details page , for displaying hourly weather forcast for per day. here This information is displayed using nivo library graph : 

![image](https://user-images.githubusercontent.com/29644684/91648339-324db400-ea5e-11ea-824b-118d706df819.png)

The user can either select a day by clicking on an day to display it's hourly forcast or by manually typing the name of the day in the route .


## Project Stucture 
 #### src/actions
    here you find the action creators, action types, and services
 #### src/compnents
    this folder contains the components used across the application
 #### src/reducers
    this file contain a file that hosts the logic for the root reducer (since we only have one)
 #### src/store
    this file is for our redux store.

![image](https://user-images.githubusercontent.com/29644684/91648377-ac7e3880-ea5e-11ea-8882-46677bed8169.png)




## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!



