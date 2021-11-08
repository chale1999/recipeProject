const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// make sure to install mongoose!
// do so by in the main project directory typing 'npm install mongoose --save'

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://chale:yQ7WVuBw0ZEWtJDK@cluster0.f6rtb.mongodb.net/recipeDB';
const url = 'mongodb+srv://chale:yQ7WVuBw0ZEWtJDK@cluster0.f6rtb.mongodb.net/recipeDB?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

app.use('/api', require('./routes/api'));
/*
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS' //Edit this when adding/editing API endpoints
    );
    next();
});
*/

app.listen(process.env.port || 5000, function(){
    console.log('now listening for requests');
}); // start Node + Express server on port 5000


var user =
{
    userId: 0,
    dateCreated: "",
    dateLastLoggedIn: "",
    login: "",
    password: "", //figure out how to hash
    subbedTo: [],
    screenName: "",
    bookmarks: [],
    birthday: "",
    email: "",
    phone: "",
    profilePic: "",
};

var recipe =
{
    recipeId: 0,
    dateCreated: "",
    dateLastEdited: "",
    ingredients: [],
    directions: "",
    userId: 0, //userId of person who posted it
};

var comment =
{
    userId: 0,
    recipeId: 0,
    dateCreated: "",
    dateEdited: "",
    content: "",
    commentId: 0,
    repliedTo: 0, //commentId of what it's replying to
};
