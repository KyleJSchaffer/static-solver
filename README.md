# Static Equilibrium Solver
The purpose of this application is to find the conditions where a system of forces acting on an object will result in static equilibrium. An object is in static equilibrium when the sum of all forces and the sum of all moments is zero. This application takes an input of forces; calculates their x, y, and moment components; finds the unknown variables in the input; and calculates the solution for the system if the number of equations and unknowns variables are equal.

## Getting Started
To start the webpack dev server run the command
```
npm start
```
To deploy, first build the project by running the command
```
npm run build
```
Then serve the html file from the build folder.

## Design Pattern
This project follows a Model-View-Controller design pattern. The views are responsible solely for manipulating the DOM. They receive their data and event handler functions from the controllers. The controllers read and edit data from the models, and pass data and event handler functions to the views. The models store the data and allow the controllers to subscribe to them with a function (usually a function that passes the new data to the view). When a model is changed, all the subscribed functions from the controllers are called.

## Built With
* [jQuery](https://jquery.com/) for DOM manipulation
* [mathjs](https://mathjs.org/) to parse, evaluate, and simplify equations and matrices
* Bundled with [webpack](https://webpack.js.org/)
