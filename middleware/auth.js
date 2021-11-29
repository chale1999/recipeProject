const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) { 
        return res.status(401).json({success: false, error: "Not token found"});
    }

    try{
        const decoded_identifier = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded_identifier.id);

        if(!user) {
            return res.status(404).json({success: false, error: "No user found with this id"});
        }

        req.user = user;

        next();

    }catch(error){
        return res.status(401).json({success: false, error: "Not authorized"});
    }
}