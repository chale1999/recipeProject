const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');           
const PORT = process.env.PORT || 5000;  


const app = express();

app.set('PORT', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient; 
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
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

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
