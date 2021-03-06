const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const privateRoute = require("./routes/private");
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.set('PORT', (process.env.PORT || 5000));

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewURLParser : true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log('Mongoose is connected!!!');
});


// middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true}));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/private", privateRoute);

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
/*
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
*/
