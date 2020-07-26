const express = require('express');
const app = express();
const mongoose = require('mongoose'); //Used to connect to Atlas database.
const bodyParser = require('body-parser'); 
require('dotenv/config'); //Used to create the .env file to store sensible files.

app.use(bodyParser.json()); //Use bodyparser on every request.  THE ORDER OF THIS IS IMPORTANT. (bodyparser is now built in express but im using it anyways in order to follow the tutorial correctly);

//IMPORT ROUTES
//Here im using a middleware to handle all the /post requests in a different file. 
const postsRoute = require('./routes/posts'); //Requiering the file that holds the handlers for /posts requests
app.use('/posts', postsRoute); //Middleware that says if something comes from /posts use this file. 

//ROUTES
app.get('/', (req, res) => {
  res.send('We are on home');
});

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('connected to DB!')); //Atlas db connection using Mongoose.

//LISTENING TO THE SERVER
app.listen(3000);