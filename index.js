require('dotenv').config();
const express = require('express'); // express: It imports the Express framework, which is a web application framework for Node.js. Express simplifies the process of building web applications by providing a set of features and tools for handling requests, routing, middleware, and more.
// It imports the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB. 
const mongoose = require('mongoose'); //Mongoose provides a straightforward way to interact with MongoDB and define schemas and models for your data.
// Recipe: It imports the recipe model from a file named recipe.js in the models directory
const Recipe = require('./models/recipe'); //he recipe model represents the structure and behavior of a recipe document in your MongoDB database.
const { connect } = require('http2');
// creates an instance of the Express application. The express()
const app = express(); //assigning it to the app variable, you can now use this object to define routes, middleware, and other application settings.

// This line sets the view engine for your Express application to EJS (Embedded JavaScript). 
// By assigning it to the app variable, you can now use this object to define routes, middleware, and other application settings.
app.set('view engine', 'ejs'); //EJS is a template engine that allows you to embed JavaScript code directly within your HTML templates.
// You can also configure the application settings using app.set() and use middleware with app.use() to modify and handle requests and responses.
app.use(express.urlencoded({ extended: true })); // This line adds middleware to your Express application to parse URL-encoded data. 
// The app object acts as the central interface for building your web application using Express, allowing you to define the behavior and logic of your server-side application.
app.use(express.static('public')); // When a form is submitted with the "POST" method, this middleware will parse the data and make it available in the req.body object. The extended: true option allows for nested objects in the URL-encoded data.


// This is the URI that specifies the location and credentials for your MongoDB database. It includes the username (admin) and password (admin) as well as the hostname 
mongoose.connect('mongodb+srv://admin:admin@cuvettebackend2.go1eqwx.mongodb.net/cuvettebackend2?retryWrites=true&w=majority', {
  useNewUrlParser: true, // the url is is a middeware
  // This option enables the new MongoDB driver's URL parser, 
  useUnifiedTopology: true //
})

// it handles the success and error cases after establishing a connection to the MongoDB database.
  .then(() => { // This callback is executed when the connection to the MongoDB database is successfully established.
    // Once the server starts listening, it logs the success message 'Successfully connected to the MongoDB database!
    app.listen(3000, () => { // Server started on port 3000' to indicate that the server has started successfully.
      console.log('Successfully connected to the MongoDB database!');
    });
    console.log('Server started on port 3000');
  })
  // This callback is executed when there is an error connecting to the MongoDB database. 
  .catch((err) => {
    // logs the error message to the console using console.error().
    console.error('Error connecting to the database:', err.message);
  });


// app.get('/'): Sets up a route handler for the GET request to the root path ('/'). When a client makes a GET request to the root path, 
// this handler will be executed.
app.get('/', async (req, res) => { // Defines an asynchronous callback function that
  // takes in the request (req) and response (res) objects as parameters.
  try {
    // Wraps the code in a try-catch block to handle any errors that might occur during execution.
    const recipes = await Recipe.find(); // Uses the Recipe model to perform a database query to retrieve all recipes. 
    // Uses the Recipe model to perform a database query to retrieve all recipes. 
    res.render('index', { recipes }); // enders the 'index' view template, passing in recipes
    // Uses the Recipe model to perform a database query to retrieve all recipes. 
  } catch (err) {
    // Uses the Recipe model to perform a database query to retrieve all recipes
    console.error('Error getting recipes:', err.message); //  Renders the 'index' view template, passing in the 
    // The await keyword is used to wait for the asynchronous operation to complete and assign the result to the recipes variable
    // Sends a response with a status code of 500 (Internal Server Error) and the message 'Server Error' if there's an error.
    res.status(500).send('Server Error'); // This ensures that the client receives an appropriate response in case of an error.
  }
});


// app.get('/new'): Sets up a route handler for the GET request to the '/new' path. 
app.get('/new', (req, res) => { //When a client makes a GET request to '/new', this handler will be executed.
  // will process the template and generate the HTML response.
  res.render('new'); // Renders the 'new' view template. The view template engine 
  // app.post('/new'): Sets up a route handler for the POST request to the '/new' path. 
  // When a client makes a POST request to '/new', this handler will be executed.
});


// Sets up a route handler for the POST request to the '/new' path. 
// When a client makes a POST request to '/new', this handler will be executed.
app.post('/new', async (req, res) => { //  Defines an asynchronous callback function that takes in the request
  //  (req) and response (res) objects as parameters.
  try { // Wraps the code in a try-catch block to handle any errors that might occur during execution.
    // Creates a new instance of the Recipe model using the data received in the request body (req.body). 
    const recipe = new Recipe({ //  The data is accessed using properties such as name, description, and ingredients.
      // Saves the new recipe instance to the database. The await keyword is used to wait for the asynchronous operation to complete.
      name: req.body.name, // Redirects the client to the root path ('/') after the recipe has been successfully saved.
      // Logs an error message to the console if there's an error while creating and saving the recipe.
      description: req.body.description, // Sends a response with a status code of 500
      //  (Internal Server Error) and the message 'Server Error' if there's an error. 
      ingredients: req.body.ingredients // This ensures that the client receives an appropriate response in case of an error.
    });
    // The await keyword is used to wait for the asynchronous operation to complete.
    await recipe.save(); // Redirects the client to the root path ('/') after the recipe has been successfully saved.
    res.redirect('/'); // In summary, this code handles the POST request to the '/new' path, creates a new recipe object based on the data received in the request body,
  } catch (err) {
    // saves it to the database, and redirects the client back to the root path ('/') upon successful creation. If there's an error during the process, it logs the error and sends an appropriate error response.
    console.error('Error creating recipe:', err.message); //  Logs an error message to the console when there's an error creating and saving the recipe. 
    //  Sends a response with a status code of 500 (Internal Server Error) and the message 'Server Error'. 
    // This response is sent to the client when an error occurs during the creation and saving of the recipe. 
    res.status(500).send('Server Error'); // The res.status().send() function is used to send the response.
  }
});

// Sets up a route handler for the GET request to the '/:id/edit' path. 
// The ':id' is a route parameter that represents the ID of the recipe being edited. 
app.get('/:id/edit', async (req, res) => { // When a client makes a GET request to '/:id/edit', this handler will be executed.
  try {
    // Defines an asynchronous callback function that takes in the request (req) and response (res) objects as parameters.
    const recipe = await Recipe.findById(req.params.id); //Wraps the code in a try-catch block to handle any errors that might occur during execution.
    //  Renders the 'edit' view template and passes the retrieved recipe data as the 'recipe' variable to the template.
    res.render('edit', { recipe }); //  Renders the 'edit' view template and passes the retrieved recipe data as the 'recipe' variable to the template.
    // Logs an error message to the console if there's an error while retrieving the recipe.
  } catch (err) {
    // Sends a response with a status code of 500 (Internal Server Error) and the message 'Server Error' if there's an error. 
    console.error('Error getting recipe:', err.message); // this ensures that the client recievers an appropriate response in case of the error
    //  renders the 'edit' view template with the recipe data, and handles any errors that occur during the process.
    res.status(500).send('Server Error'); // this code handles the GET request to the '/:id/edit' path, retrieves the specified recipe from the database based on the provided ID, 
  }
});


// The route handler is defined using app.post('/:id/edit', ...), indicating that it will handle POST requests to a URL with a parameter 
// id (representing the ID of the recipe to edit).
app.post('/:id/edit', async (req, res) => { // Inside the route handler, there is a try block to handle potential errors.
  try { // to find the recipe with the specified ID in the database. 
    // The assumption here is that a Recipe model or schema has been defined and imported elsewhere in the code.
    // After retrieving the recipe, the code updates its name, description, and ingredients properties with the corresponding values from the req.body
    const recipe = await Recipe.findById(req.params.id); //  object. req.body typically contains the data submitted in the request body.
    // The recipe.save() function is called to save the updated recipe back to the database.
    // If the save operation is successful, the code executes res.redirect('/'), which redirects the user to the root URL (presumably a recipe list or home page).
    recipe.name = req.body.name; // If an error occurs at any step within the try block, the code jumps to the catch block. 
    // If an error occurs at any step within the try block, the code jumps to the catch block. 
    recipe.description = req.body.description; // are being updated based on the values received in the request body.
    // is assumed to contain the updated description for the recipe.
    recipe.ingredients = req.body.ingredients; // By updating these properties, the code modifies the recipe object with the new description and ingredients before saving it back to the database.
    await recipe.save();
    // The provided code snippet appears to be a server-side route handler for handling a POST request to edit a recipe with a specific ID. 
    res.redirect('/');
    // This line assigns the value of req.body.ingredients to the ingredients property of the recipe object.
  } catch (err) {
    // Similarly, req.body.ingredients is assumed to contain the updated list of ingredients for the recipe.
    console.error('Error updating recipe:', err.message);
    // After logging the error, the line res.status(500).send('Server Error'); sets the response status code to 500, i
    res.status(500).send('Server Error'); // indicating an internal server error. It then sends the string 'Server Error' as the response body.
  }
});



// The route handler is defined using app.post('/:id/delete', ...), indicating that it will handle POST requests
app.post('/:id/delete', async (req, res) => { //  to a URL with a parameter :id (representing the ID of the recipe to delete).
  try {
    // The code uses await Recipe.findByIdAndDelete(req.params.id) to find the recipe with the specified ID in the database and delete it
    await Recipe.findByIdAndDelete(req.params.id); // The assumption here is that a Recipe model or schema has been defined and imported elsewhere in the code.
    // If the deletion is successful, the code executes res.redirect('/'), 
    // which redirects the user to the root URL (presumably a recipe list or home page).
    res.redirect('/'); // If an error occurs at any step within the try block, the code jumps to the catch block. 
    // The error is logged to the console using console.error and a 500 status code response is sent back to the client with the message 'Server Error'.
  } catch (err) { // Please note that the findByIdAndDelete() method is assumed to be a valid method provided by the underlying database library or an ODM (Object-Document Mapping)
    // tool like Mongoose (for MongoDB). If you're using a different database or library, the method may have a different name or implementation.
    console.error('Error deleting recipe:', err.message); //  logs an error message to the console. The message includes the text 'Error deleting recipe:' followed by the error message itself, which is obtained from the err object
    // This line is useful for debugging and logging purposes, providing information about the specific error that occurred during the deletion process.
    res.status(500).send('Server Error'); // sets the response status code to 500, indicating an internal server error. It then sends the string 'Server Error' as the response body.
  }
});
