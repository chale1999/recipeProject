const router = require("express").Router();
const User = require("../models/User");
const bcrpyt = require("bcrypt");

const jwt = require('jsonwebtoken');

//update user
router.put("/:username", async(req, res) =>{
    try{
        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }
    
        if(!token) { 
            return res.status(401).json({success: false, error: "Not authorized"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded_identifier.id);

        if(!user) {
            return res.status(404).json({success: false, error: "No user found with this id"});
        }

        if(user.username === req.params.username || user.isAdmin) {
            if(req.body.password){
                try{
                    const salt = await bcrpyt.genSalt(10);
                    req.body.password = await bcrpyt.hash(req.body.password, salt);
                } catch(err){
                    return res.status(500).json("Problem updating password");
                }
            }
            try{
                const findname = await User.findOne({ username: req.params.username });
                if(!findname) {
                    return res.status(404).json({success: false, error: "No user found with this username"});
                }

                await User.findByIdAndUpdate(findname.id, {
                    $set: req.body,
                });
                return res.status(200).json("Account has been updated");
            }catch(err)
            {
                return res.status(500).json({Success: false, Error: "Problem finding and updating username passed in req body"});
            }
        } else{
            return res.status(403).json("You can update only your account");
        }
    } catch(err){
        return res.status(401).json("Not authorized to update this user");
    }

});

//delete user
router.delete("/:username", async(req, res) => {
    try {
        if(req.header('Authorization')&& req.header('Authorization').startsWith("Bearer")) {
            token = req.header('Authorization').split(" ")[1]
        }
    
        if(!token) { 
            return res.status(401).json({success: false, error: "Not authorized"});
        }

        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded_identifier.id);

        if(!user) {
            return res.status(404).json({success: false, error: "No user found with this id"});
        }
        
        if(user.username === req.params.username || user.isAdmin) {
            if(req.body.password) {
                try {
                    const salt = await bcrpyt.genSalt(10);
                    req.body.password = await bcrpyt.hash(req.body.password, salt);
                } catch(err){
                    return res.status(500).json("first");
                }
            }
            try {
                const findname = await User.findOne({ username: req.params.username });
                if(!findname) {
                    return res.status(404).json({success: false, error: "No user found with this username"});
                }

                await User.findByIdAndDelete(findname.id);
                return res.status(200).json("Account has been deleted");
            }catch(err)
            {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can only delete your account");
        }

    }catch(error) {
        return res.status(401).json("Not authorized");
    }
});

//get a  user
router.get("/:username", async (req, res) =>{
    try{
        const user = await User.findOne({ username: req.params.username });
        const{password, updatedAt, ...other} = user._doc
        return res.status(200).json(other);
    }catch(err){
        return res.status(500).json(err);
    }
});

//follow a user
router.put("/:username/follow", async (req, res) =>{
    try{
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
        
        if(currentUser.username != req.params.username) {
            try {
                const otheruser = await User.findOne({ username: req.params.username });
                if (!otheruser.followers.includes(currentUser.username)) {
                    await otheruser.updateOne({ $push: { followers: currentUser.username } });
                    await currentUser.updateOne({ $push: { following: req.params.username } });
                    return res.status(200).json("user has been followed");
                } else {
                    return res.status(403).json("you already follow this user");
                }
            } catch(err) {
                return res.status(500).json("Error following user");
            }
        } else {
            return res.status(403).json("you cant follow yourself");
        }

    }catch(error){
        return res.status(403).json("Not authorized");
    }
});

//unfollow a user
router.put("/:username/unfollow", async (req, res) =>{
    try{

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
        
        if (currentUser.username !== req.params.username){
            try {
                const otheruser = await User.findOne({ username: req.params.username });
                if (otheruser.followers.includes(currentUser.username)) {
                    await otheruser.updateOne({ $pull: { followers: currentUser.username} });
                    await currentUser.updateOne({ $pull: { following: req.params.username } });
                    return res.status(200).json("user has been unfollowed");
                } else {
                    return res.status(403).json("you don't follow this user");
                }
            } catch(err) {
                return res.status(500).json("NOPE");
            }
        } else {
            return res.status(403).json("you cant unfollow yourself");
        }

    }catch(error){
        return res.status(403).json("Not Authorized");
    }
});

module.exports = router