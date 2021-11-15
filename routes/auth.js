const router = require("express").Router();
const User = require("../models/User");
const bcrpyt = require("bcrypt");

// Register 
router.post("/register", async (req, res) =>{
    try{
        // generate new password
        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrpyt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router