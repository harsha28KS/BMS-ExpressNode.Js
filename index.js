const MovieModel = require("./database/movies");
const UserModel = require("./database/users");

require('dotenv').config();
const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());       

// import the mongoose module
var mongoose =  require("mongoose");
// Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"));


// Homepage : http://localhost:5000/

app.get('/', (req, res) => {
    return res.json({"WELCOME":`to my Backend Software for the Book-My-Show`});
});

//  ------------------------------------------


//------------ MOVIE API ------------

/*
Route           /movies
Description     Get all the Movies
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
//  http://localhost:5000/movies   

app.get('/movies', async (req, res) => {
    const getAllMovies = await MovieModel.find();
    console.log(getAllMovies);
    return res.json(getAllMovies);
});


/*
Route           /movie/
Description     Get a specific Movie
Access          PUBLIC
Parameter       id
Methods         GET
*/
//  http://localhost:5000/movie/ 

app.get('/movie/:id',async (req, res) => {
    const {id} = req.params;                  
    // console.log(id);
    const getSpecificMovie = await MovieModel.findOne({_id: id});
    console.log(getSpecificMovie);
    // if(getSpecificMovie === null) {
    //     return res.json({"error":`No Movie Found for the ISBN of ${isbn}`})   
    // }
    return res.json(getSpecificMovie);
});



//------------ USER API ------------

/*
Route           /users
Description     Get all the Users
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
//  http://localhost:5000/users   

app.get('/users', async (req, res) => {
    const getAllUsers = await UserModel.find();
    console.log(getAllUsers);
    return res.json(getAllUsers);
});


/*
Route           /user-register
Description     Post single user details in users collection
Access          
Parameter       NONE
Methods         POST
*/
//  http://localhost:5000/user-register

app.post('/user-register', async (req, res) => {
    const addNewUser = await UserModel.create(req.body);
    return res.json({
        userAdded: addNewUser,
        message: "User was added !!!"
    });
});



// ------------------------------------------

app.listen(5000, () => {
    console.log("My Express App is running")
});