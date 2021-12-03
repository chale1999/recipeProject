const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// create a post
router.post("/", async (req, res) =>{
    try{
        let token;

        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }

        if(!token) { 
            return res.status(401).json({success: false, error: "Not authorized"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded_identifier.id);

        if(!currentUser) {
            return res.status(404).json({success: false, error: "No user found with this id"});
        }

        try{

            const username = currentUser.username; // gotten from bearer token
           
            const {desc, recipeName, ingredients, directions, servingCount, prepTime, cookTime } = req.body;
          
            if(!recipeName|| !ingredients || !directions)
            {
                return res.status(500).json({Success: false, Error: "Each Recipe Needs a Name, Ingredients List, and Directions."})
            }
            
            const newPost =  new Post({
                username,
                desc,
                recipeName,
                ingredients,
                directions,
                servingCount,
                prepTime,
                cookTime,
            }); 

            try{

                const savedPost = await newPost.save();
                return res.status(200).json(savedPost);

            }catch(err){
                return res.status(500).json(err);
            }

        }catch(err){
            return res.status(500).json({Success: false, Error: "Error Creating New Post"})
        }
        

    } catch(err){
        return res.status(401).json({Success: false, Error: "something wrong"});
    }
});


// update a post (id in params is id of post)
router.put("/:id", async (req, res) =>{
    try{
        let token;

        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }

        if(!token) { 
            return res.status(401).json({success: false, error: "Not authorized"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded_identifier.id);

        if(!currentUser) {
            return res.status(404).json({success: false, error: "No user found with this id"});
        }

        try{
            const post = await Post.findById(req.params.id); // id is the post id

            if(post.username === currentUser.username){
                await post.updateOne({$set: req.body});
                res.status(200).json({Success: true, Response: "Post Updated"});
            }else{
                return res.status(403).json({Success: false ,Error: "Cannot Update Other Users Posts"});
            }

        }catch(err){
            res.status(500).json({Success: false, Error: "Error Changing Post"});
        }

    }catch(err){
        return res.status(401).json({Success: false, Error: "Not authorized"});
    }
});

//  delete a post
router.delete("/:id", async (req, res) =>{
    try{
        let token;

        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }

        if(!token) { 
            return res.status(401).json({success: false, error: "Not authorized"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET); // get the decoded token id

        const user = await User.findById(decoded_identifier.id); // find user with that id in db

        if(!user) { // if the user dosent exist return error
            return res.status(404).json({success: false, error: "No user found with this id"});
        }

        try{ // user now found with decoded id so find post
            const postDel = await Post.findById(user.username); 
            if(postDel.username === user.username){
                await postDel.deleteOne();
                return res.status(200).json({Success: true ,Error: "Post Deleted"});
            }else{
                return res.status(403).json({ Success: false , Error: "Cannot Delete Other Users Posts"});
            }
    
        }catch(err){
            return res.status(500).json({ Success: false , Error: "Error Deleting Post."});
        }

    }catch(err){
        return res.status(401).json({Success: false, Error: "Not authorized"});
    }
});


// like / dislike a post
router.put("/:id/like", async (req, res) =>{
    try{
        let token;

        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }

        if(!token) { 
            return res.status(401).json({success: false, error: "Not authorized"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET); // get the decoded token id

        const user = await User.findById(decoded_identifier.id); // find user with that id in db

        if(!user) { // if the user dosent exist return error
            return res.status(404).json({success: false, error: "No user found with this id"});
        }

        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(user.username)){
            await post.updateOne({ $push : { likes : user.username } });
            return res.status(200).json("Post liked");
        } else{
            await post.updateOne({ $pull: { likes : user.username } });
            return res.status(200).json("Post disliked");
        }
    }catch(err){
        return res.status(500).json({Success: false, Error: "Not Authorized"});
    }
    
});

// get a post
router.get("/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
    
});

// get all the posts created by a specfic user
router.get("/getall/:username", async (req, res) =>{
    try{
        Post.find({username : req.params.username }, (err, results)=> {
            if (results) {
                return res.send(results)
            } else {
                return res.send("No recipes are made by this user yet.");
                }
        });
    }catch(err){
        return res.status(500).json(err);
    }
    
});



// get a post
router.get("/search/:searchTerm", async (req, res) =>{
    try{
        let partialToMatch= new RegExp(req.params.searchTerm,'i'); 
        Post.find({recipeName : partialToMatch }, (err, results)=> {
            if (results) {
                return res.send(results)
            } else {
                return res.send("No recipes matching that title was found.");
                }
        });
    }catch(err){
        return res.status(500).json(err);
    }
    
});


// get timeline posts
router.get("/timeline/all", async (req, res) => {
    try{
        let token;

        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }

        if(!token) { 
            return res.status(401).json({success: false, error: "No token found"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET); // get the decoded token id

        const user = await User.findById(decoded_identifier.id); // find user with that id in db

        if(!user) { // if the user dosent exist return error
            return res.status(404).json({success: false, error: "No user found with this id"});
        }
        try{
            const userPosts = await Post.find({ username : user.username });
            const friendPosts = await Promise.all(
                user.following.map((friend) => {
                return Post.find({ username : friend })
                })
            );
            return res.json(userPosts.concat(...friendPosts));
        }catch(err){
            return res.status(500).json({Success: false, Error: "Could not return posts"})
        }
        

    }catch(err){
        return res.status(500).json("Not Authorized");
    }
    
});





module.exports = router;