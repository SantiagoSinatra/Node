const express = require('express'); //Used to handle HTTP Requests.
const cors = require('cors'); //Used to enable Cros Origin Resource Sharing.
const mongoose = require('mongoose'); //Used to connect to the MongoDB database.

require('dotenv').config(); //Used to store the enviornment variables in a .env file in order to keep sensible data protected.

// Create express server.
const app = express();
const port = process.env.PORT || 5000; //Check if there is a defined port in the env variables, else use port 5000.

//Middlewares
app.use(cors()); //Cors middleware.
app.use(express.json()); //This allows to parse JSON in order to send and recieve JSON.

//Connection to the database.
//Connect to database.
const uri = process.env.ATLAS_URI; //Get the uri to connect to the database and store it in a constant.
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}); //Connect to the database using the URI provided by

//Check if the connection was established successfully.
const connection = mongoose.connection;
connection.once('open', () => { //Listener that checks if the database has connected.
  console.log('Database connection established successfully');
});

//Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//Middlewares to redirect the different requests to different routers.
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Start express server.
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});